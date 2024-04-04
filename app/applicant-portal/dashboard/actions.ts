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

export async function getApplicationDetails() {
  const { id: applicantUsername } = await getPayload();

  const applicantData = await prisma.applicant.findUnique({
    where: {
      username: applicantUsername,
    },
    include: {
      details: {
        include: {
          applicantProgrammePriorities: { include: { programme: true } },
          educationBackgrounds: true,
          additionalEducationFiles: true,
          educationFile: true,
        },
      },
      formalImage: true,
    },
  });

  if (
    !applicantData ||
    !applicantData.details ||
    !applicantData.formalImage ||
    !applicantData.details.educationFile
  ) {
    throw new Error(
      `Unable to locate the applicant details for the applicant with the username: ${applicantUsername}.`,
    );
  }

  const programmes = await prisma.programme.findMany({
    where: {
      level: applicantData.applicationType,
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
    details: {
      educationBackgrounds,
      additionalEducationFiles,
      applicantProgrammePriorities,
      educationFile,
    },
  } = applicantData;

  const applicantEducationBackgrounds = educationBackgrounds.map((item) => {
    const { id, ...rest } = item;
    return { _id: id, ...rest };
  });

  return {
    applicationType: applicantData.applicationType,
    details: applicantData.details,
    formalImage,
    educationFile,
    additionalEducationFiles,
    programmeList: programmes,
    applicantEducationBackgrounds,
    applicantProgrammePriorities,
    highestEducationLevel: applicantData.highestEducationLevel,
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
  const { id: applicantUsername } = await getPayload();

  await prisma.applicantFormalImage.update({
    where: {
      applicantUsername,
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
  const { id: applicantUsername } = await getPayload();

  await prisma.applicantFormalImage.update({
    where: {
      applicantUsername,
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
  const { id: applicantUsername } = await getPayload();

  await prisma.applicantEducationFile.update({
    where: {
      applicantUsername,
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
  const { id: applicantUsername } = await getPayload();

  await prisma.applicantEducationFile.update({
    where: {
      applicantUsername,
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
  await prisma.applicantAdditionalFile.delete({
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
  const { id: applicantUsername } = await getPayload();

  await prisma.applicantAdditionalFile.create({
    data: {
      applicationDetails: {
        connect: {
          applicantUsername,
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
  const { id: applicantUsername } = await getPayload();

  if (position < 0 || position > 5)
    throw new Error("The provided position is invalid.");

  const newEducation = await prisma.applicantEducationBackground.create({
    data: {
      applicationDetails: {
        connect: {
          applicantUsername,
        },
      },
      position,
    },
  });

  return newEducation.id;
};

export const deleteApplicantEducationBackground = async (itemId: string) => {
  await prisma.applicantEducationBackground.delete({
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
  const { id: applicantUsername } = await getPayload();

  const { education, ...rest } = applicantFormData.formData;

  await prisma.applicationDetails.update({
    where: {
      applicantUsername,
    },
    data: rest,
  });

  for (const educationBackground of education) {
    await prisma.applicantEducationBackground.update({
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
