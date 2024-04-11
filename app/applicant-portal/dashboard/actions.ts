"use server";

import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import moment from "moment-timezone";
import { revalidatePath } from "next/cache";
import { getSession, setSession } from "@/lib";
import { redirect } from "next/navigation";
import { ApplicantFormData } from "./data";
// import { utapi } from "@/server/uploadthing";
import { logError } from "@/utils/logger";
import { getPayload } from "../actions";

const baseUrl = "/applicant-portal/dashboard";

async function getApplicant() {
  const { id: username } = await getPayload();

  const applicant = await prisma.applicant.findUnique({
    where: {
      username,
    },
  });

  if (!applicant)
    throw new Error(
      `Unable to locate the applicant details for the applicant with the username: ${username}.`,
    );

  return applicant;
}

export async function getApplicationDetails() {
  const { id: applicantUsername } = await getPayload();

  const applicantData = await prisma.applicant.findUnique({
    where: {
      username: applicantUsername,
    },
    include: {
      basicInfo: {
        include: {
          educationBackgrounds: {
            orderBy: {
              position: "asc",
            },
          },
          educationFile: true,
          additionalEducationFiles: true,
        },
      },
      applicationDetails: {
        include: {
          applicantProgrammePriorities: {
            include: { programme: true },
            orderBy: {
              priority: "asc",
            },
          },
        },
      },
      formalImage: true,
    },
  });

  if (
    !applicantData ||
    !applicantData.applicationDetails ||
    !applicantData.formalImage ||
    !applicantData.basicInfo.educationFile ||
    !applicantData.basicInfo
  ) {
    throw new Error(
      `Unable to locate the applicant details for the applicant with the username: ${applicantUsername}.`,
    );
  }

  const programmes = await prisma.programme.findMany({
    where: {
      level: applicantData.applicationDetails.applicationType,
    },
    include: {
      department: {
        include: {
          college: {
            include: { campus: true },
          },
        },
      },
    },
  });

  const {
    formalImage,
    basicInfo: {
      educationBackgrounds,
      additionalEducationFiles,
      educationFile,
    },
    applicationDetails: { applicantProgrammePriorities },
  } = applicantData;

  const applicantEducationBackgrounds = educationBackgrounds.map((item) => {
    const { id, ...rest } = item;
    return { _id: id, ...rest };
  });

  const details = {
    ...applicantData.basicInfo,
    ...applicantData.applicationDetails,
  };

  return {
    applicationType: applicantData.applicationDetails.applicationType,
    details,
    formalImage,
    educationFile,
    additionalEducationFiles,
    programmeList: programmes,
    applicantEducationBackgrounds,
    applicantProgrammePriorities,
    highestEducationLevel:
      applicantData.applicationDetails.highestEducationLevel,
  };
}

export async function deleteApplicantProgramme(id: string) {
  await prisma.applicantProgrammePriority.delete({
    where: {
      id,
    },
  });

  revalidatePath(baseUrl);
}

export const addApplicantImageData = async (applicantImageData: {
  key: string;
  url: string;
  name: string;
  size: number;
}) => {
  const applicant = await getApplicant();

  await prisma.formalImage.update({
    where: {
      id: applicant.formalImageId,
    },
    data: {
      imageUrl: applicantImageData.url,
      key: applicantImageData.key,
      name: applicantImageData.name,
      size: applicantImageData.size,
    },
  });

  revalidatePath(baseUrl);
};

export const deleteApplicantImageData = async () => {
  const applicant = await getApplicant();

  await prisma.formalImage.update({
    where: {
      id: applicant.formalImageId,
    },
    data: {
      imageUrl: "",
      key: "",
      name: "",
      size: 0,
    },
  });

  revalidatePath(baseUrl);
};

export const deleteApplicantEducationFileData = async () => {
  const { id: username } = await getPayload();

  const applicant = await prisma.applicant.findUnique({
    where: {
      username,
    },
    include: {
      basicInfo: {
        include: {
          educationFile: true,
        },
      },
    },
  });

  if (!applicant || !applicant.basicInfo.educationFile)
    throw new Error(
      `Unable to locate the applicant details for the applicant with the username: ${username}.`,
    );

  await prisma.educationFile.update({
    where: {
      id: applicant.basicInfo.educationFile.id,
    },
    data: {
      url: "",
      key: "",
      name: "",
      type: "",
      size: 0,
    },
  });

  revalidatePath(baseUrl);
};

export const addApplicantEducationFile = async (
  applicantEducationFileData: {
    key: string;
    url: string;
    name: string;
    size: number;
  },
  fileType: string,
) => {
  const { id: username } = await getPayload();

  const applicant = await prisma.applicant.findUnique({
    where: {
      username,
    },
    include: {
      basicInfo: {
        include: {
          educationFile: true,
        },
      },
    },
  });

  if (!applicant || !applicant.basicInfo.educationFile)
    throw new Error(
      `Unable to locate the applicant details for the applicant with the username: ${username}.`,
    );

  await prisma.educationFile.update({
    where: {
      id: applicant.basicInfo.educationFile.id,
    },
    data: {
      url: applicantEducationFileData.url,
      key: applicantEducationFileData.key,
      name: applicantEducationFileData.name,
      size: applicantEducationFileData.size,
      type: fileType,
    },
  });

  revalidatePath(baseUrl);
};

export const deleteApplicantAdditionalFileData = async (id: string) => {
  await prisma.additionalEducationFile.delete({
    where: {
      id,
    },
  });

  revalidatePath(baseUrl);
};

export const addApplicantAdditionalFile = async (
  applicantEducationFileData: {
    key: string;
    url: string;
    name: string;
    size: number;
  },
  fileType: string,
) => {
  const { id: username } = await getPayload();

  const applicant = await prisma.applicant.findUnique({
    where: {
      username,
    },
    include: {
      basicInfo: true,
    },
  });

  if (!applicant || !applicant.basicInfo)
    throw new Error(
      `Unable to locate the applicant details for the applicant with the username: ${username}.`,
    );

  await prisma.additionalEducationFile.create({
    data: {
      basicInfo: {
        connect: {
          id: applicant.basicInfo.id,
        },
      },
      url: applicantEducationFileData.url,
      key: applicantEducationFileData.key,
      name: applicantEducationFileData.name,
      size: applicantEducationFileData.size,
      type: fileType,
    },
  });

  revalidatePath(baseUrl);
};

export const addApplicantEducationBackground = async (position: number) => {
  const { id: username } = await getPayload();

  const applicant = await prisma.applicant.findUnique({
    where: {
      username,
    },
    include: {
      basicInfo: true,
    },
  });

  if (!applicant || !applicant.basicInfo)
    throw new Error(
      `Unable to locate the applicant details for the applicant with the username: ${username}.`,
    );

  if (position < 0 || position > 5)
    throw new Error("The provided position is invalid.");

  const newEducation = await prisma.educationBackground.create({
    data: {
      basicInfo: {
        connect: {
          id: applicant.basicInfo.id,
        },
      },
      position,
    },
  });

  return newEducation.id;
};

export const deleteApplicantEducationBackground = async (itemId: string) => {
  await prisma.educationBackground.delete({
    where: {
      id: itemId,
    },
  });

  revalidatePath(baseUrl);
};

export const generateControlNumber = async () => {
  const { id: applicantUsername } = await getPayload();

  // FIXME: use api to get control number
  const controlNumber = Math.floor(Math.random() * 900000000000) + 100000000000;

  const controlNumberString = controlNumber.toString();

  await prisma.applicationDetails.update({
    where: { applicantUsername },
    data: {
      controlNumber: controlNumberString,
    },
  });

  revalidatePath(baseUrl);
};

export const saveApplicationData = async (
  applicantFormData: ApplicantFormData,
) => {
  const { id: username } = await getPayload();

  const applicant = await prisma.applicant.findUnique({
    where: {
      username,
    },
    include: {
      basicInfo: true,
    },
  });

  if (!applicant || !applicant.basicInfo)
    throw new Error(
      `Unable to locate the applicant details for the applicant with the username: ${username}.`,
    );

  const { education, ...rest } = applicantFormData.formData;

  await prisma.basicInfo.update({
    where: {
      id: applicant.basicInfoId,
    },
    data: rest,
  });

  for (const educationBackground of education) {
    await prisma.educationBackground.update({
      where: { id: educationBackground._id },
      data: {
        position: educationBackground.position,
        level: educationBackground.level,
        schoolName: educationBackground.schoolName,
        startYear: educationBackground.startYear,
        endYear: educationBackground.endYear,
      },
    });
  }

  for (const programme of applicantFormData.applicantProgrammes) {
    await prisma.applicantProgrammePriority.update({
      where: { id: programme.id },
      data: {
        priority: programme.priority,
        programmeCode: programme.programmeCode,
      },
    });
  }

  revalidatePath(baseUrl);
};

export const submitApplicantApplication = async () => {
  const { id: applicantUsername } = await getPayload();

  const now = new Date();

  await prisma.applicationDetails.update({
    where: {
      applicantUsername,
    },
    data: {
      applicationStatus: "UNDER_REVIEW",
      submittedAt: now,
    },
  });

  revalidatePath(baseUrl);
};

export const addApplicantProgrammePriority = async (
  programmeCode: string,
  priority: number,
) => {
  const { id: applicantUsername } = await getPayload();

  const newProgramme = await prisma.applicantProgrammePriority.create({
    data: {
      priority,
      programme: {
        connect: {
          code: programmeCode,
        },
      },
      applicationDetails: {
        connect: {
          applicantUsername,
        },
      },
    },
  });

  return newProgramme;
};

export const setRulesAccepted = async () => {
  const { id: applicantUsername } = await getPayload();

  const now = new Date();

  await prisma.universityPolicyAccepted.update({
    where: {
      applicantUsername,
    },
    data: {
      hasAcceptedRules: true,
      acceptedAt: now,
    },
  });

  revalidatePath(baseUrl);
};

export const hasAcceptedRules = async () => {
  const { id: applicantUsername } = await getPayload();

  const data = await prisma.universityPolicyAccepted.findUnique({
    where: {
      applicantUsername,
    },
  });

  if (!data) {
    throw new Error(
      `Unable to locate the applicant university policy details for the applicant with the username: ${applicantUsername}.`,
    );
  }

  return data.hasAcceptedRules;
};
