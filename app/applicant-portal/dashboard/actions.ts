"use server";

import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import moment from "moment-timezone";
import { revalidatePath } from "next/cache";
import { getSession, setSession } from "@/lib";
import { redirect } from "next/navigation";
import { ApplicantProgram } from "@/types/application";
import { ApplicantFormData } from "./data";
import { Programme } from "@/types/draftProgrammes";
// import { utapi } from "@/server/uploadthing";
import { logError } from "@/utils/logger";

const baseUrl = "/applicant-portal/dashboard";

export const getPayload = async () => {
  const payload = await getSession();

  if (!payload) redirect("/auth/applicant");

  return payload;
};

export async function getApplicationDetails() {
  const { id: applicantUsername } = await getPayload();

  const applicantData = await prisma.applicant.findUnique({
    where: {
      username: applicantUsername,
    },
    include: {
      details: true,
      formalImage: true,
      educationFile: true,
      applicantProgrammes: { include: { programme: true } },
      educationBackgrounds: true,
      additionalEducationFiles: true,
    },
  });

  if (!applicantData) {
    throw new Error(
      `Unable to locate the applicant details for the applicant with the username: ${applicantUsername}.`,
    );
  }

  const {
    educationBackgrounds,
    additionalEducationFiles,
    educationFile,
    details,
    formalImage,
    applicantProgrammes,
  } = applicantData;

  const applicantEducationBackgrounds = educationBackgrounds.map((item) => {
    const { id, ...rest } = item;
    return { _id: id, ...rest };
  });

  return {
    details,
    formalImage,
    educationFile,
    applicantProgrammes,
    additionalEducationFiles,
    applicantEducationBackgrounds,
  };
}

export async function deleteApplicantProgramme(id: string) {
  await prisma.applicantProgrammes.delete({
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
      applicant: {
        connect: {
          username: applicantUsername,
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
      applicant: {
        connect: {
          username: applicantUsername,
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

  await prisma.applicantDetails.update({
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

  await prisma.applicantDetails.update({
    where: {
      applicantUsername,
    },
    data: applicantFormData,
  });

  for (const educationBackground of applicantFormData.formData.education) {
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
    await prisma.applicantProgrammes.update({
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

  await prisma.applicantDetails.update({
    where: {
      applicantUsername,
    },
    data: {
      status: "UNDER_REVIEW",
    },
  });

  revalidatePath(baseUrl);
};
