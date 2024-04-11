"use server";

import { getSession } from "@/lib";
import prisma from "@/prisma/db";
import { redirect } from "next/navigation";

export const getPayload = async () => {
  const payload = await getSession();

  if (!payload) redirect("/auth/applicant");

  return payload;
};

export const getApplicantInfo = async () => {
  const { id: username } = await getPayload();

  const applicant = await prisma.applicant.findUnique({
    where: { username },
    include: {
      formalImage: true,
      basicInfo: true,
      applicationDetails: true,
    },
  });

  if (
    !applicant ||
    !applicant.basicInfo ||
    !applicant.applicationDetails ||
    !applicant.formalImage
  ) {
    throw new Error(
      `Unable to locate the applicant details for the applicant with the username: ${username}.`,
    );
  }

  return {
    firstName: applicant.basicInfo.firstName,
    lastName: applicant.basicInfo.lastName,
    username: applicant.username,
    imageUrl: applicant.formalImage.imageUrl,
    status: applicant.applicationDetails.applicationStatus,
  };
};
