"use server";

import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import moment from "moment-timezone";
import { revalidatePath } from "next/cache";
import { getSession, setSession } from "@/lib";
// import { ApplicantApplication, NewApplicant } from "./schema";
import { redirect } from "next/navigation";
import { ApplicantProgram } from "@/types/application";
import { ApplicantFormData } from "@/components/applicant/data";
import { Programme } from "@/types/draftProgrammes";
import { utapi } from "@/server/uploadthing";
import { logError } from "@/utils/logger";

export const getPayload = async () => {
  const payload = await getSession();

  if (!payload) redirect("/auth/applicant");

  return payload;
};

async function getApplicationDetails() {
  const { id: applicantUsername } = await getPayload();

  const applicantDetails = await prisma.applicantDetails.findUnique({
    where: {
      applicantUsername,
    },
    include: {
      applicantProgrammes: { include: { programme: true } },
      applicantEducationBackground: true,
      applicantAdditionalFileData: true,
    },
  });

  const applicantImageData = await prisma.applicantImageData.findUnique({
    where: {
      applicantUsername,
    },
  });

  const applicantEducationFileData =
    await prisma.applicantEducationFileData.findUnique({
      where: {
        applicantUsername,
      },
    });

  if (!applicantDetails || !applicantImageData || !applicantEducationFileData) {
    throw new Error(
      `Unable to locate the applicant details for the applicant with the username: ${applicantUsername}.`,
    );
  }
}
