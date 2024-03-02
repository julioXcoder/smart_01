"use server";

import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import moment from "moment-timezone";
import { revalidatePath } from "next/cache";
import { logOperationError } from "@/utils/logger";
import { getSession, setSession } from "@/lib";
import { ApplicantApplication, NewApplicant } from "./schema";
import { redirect } from "next/navigation";

// HELPER

export const getPayload = async () => {
  const payload = await getSession();

  if (!payload) redirect("/auth/applicant");

  return payload;
};

// HELPER

// CLIENT ////////////////////////////////////////////////////

export const newApplicantAccount = async (newApplicantData: NewApplicant) => {
  try {
    const {
      username,
      formIVIndex,
      password,
      origin,
      highestEducationLevel,
      applicationType,
      firstName,
      middleName,
      lastName,
    } = newApplicantData;

    const latestAcademicYear = await prisma.academicYear.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!latestAcademicYear) {
      throw new Error("Latest Academic Year not found!");
    }

    const universityApplication = await prisma.universityApplication.findFirst({
      where: { academicYearId: latestAcademicYear.id },
    });

    if (!universityApplication) {
      throw new Error("University application not found!");
    }

    const applicant = await prisma.applicant.findUnique({
      where: {
        username,
      },
    });

    if (applicant) {
      return { message: "username already exist." };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newApplicant = await prisma.applicant.create({
      data: {
        username,
        hashedPassword,
      },
    });

    const now = new Date();

    const newApplicantApplication = await prisma.applicantApplication.create({
      data: {
        formIVIndex,
        type: applicationType,
        origin,
        highestEducationLevel,
        applicantUsername: newApplicant.username,
        universityApplicationId: universityApplication.id,
        createdAt: now,
      },
    });

    await prisma.applicantProfile.create({
      data: {
        applicantApplicationId: newApplicantApplication.id,
        firstName,
        middleName,
        lastName,
      },
    });

    await prisma.applicantImageData.create({
      data: {
        applicantApplicationId: newApplicantApplication.id,
      },
    });

    await prisma.applicantEducationFileData.create({
      data: {
        applicantApplicationId: newApplicantApplication.id,
      },
    });

    await prisma.applicantContacts.create({
      data: {
        applicantApplicationId: newApplicantApplication.id,
      },
    });

    await prisma.applicantEmergencyContacts.create({
      data: {
        applicantApplicationId: newApplicantApplication.id,
      },
    });

    await prisma.applicantEducationBackground.create({
      data: {
        applicantApplicationId: newApplicantApplication.id,
        position: 0,
      },
    });

    await prisma.applicationPayment.create({
      data: {
        applicantApplicationId: newApplicantApplication.id,
      },
    });

    const data = { id: newApplicant.username, role: newApplicant.role };

    await setSession(data);
  } catch (error) {
    logOperationError(error, "newApplicantAccount");
    return {
      message:
        "We’re sorry, but we were unable to create your account at this time. Please try again later, and if the problem persists, reach out to our support team for assistance.",
    };
  }
  redirect("/application-portal/my-applications");
};

export const authorizeApplicant = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const applicant = await prisma.applicant.findUnique({
      where: {
        username,
      },
    });

    if (!applicant) return { message: "Invalid username or password" };

    const match = await bcrypt.compare(password, applicant.hashedPassword);

    if (!match) return { message: "Invalid username or password" };

    const payload = { id: applicant.username, role: applicant.role };

    await setSession(payload);
  } catch (error) {
    logOperationError(error, "authorizeApplicant");
    return {
      message:
        "We’re sorry, but an issue arose while signing in. Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
    };
  }
  redirect("/application-portal/my-applications");
};

// CLIENT ////////////////////////////////////////////////////

// SERVER ////////////////////////////////////////////////////

export const getApplications = async () => {
  const payload = await getPayload();

  const applicant = await prisma.applicant.findUnique({
    where: {
      username: payload.id,
    },
  });

  if (!applicant) throw new Error("No Applicant");

  const applicantApplications = await prisma.applicantApplication.findMany({
    where: {
      applicantUsername: applicant.username,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const latestAcademicYear = await prisma.academicYear.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!latestAcademicYear) throw new Error("Latest Academic Year not found!");

  const universityApplication = await prisma.universityApplication.findFirst({
    where: { academicYearId: latestAcademicYear.id },
  });

  if (!universityApplication)
    throw new Error("University application not found!");

  const canCreateApp = applicantApplications.some(
    (application) =>
      application.universityApplicationId === universityApplication.id,
  );

  // const applications = await Promise.all(
  //   applicantApplications.map(async (application) => {
  //     let isExpired = false;

  //     const universityApplication =
  //       await prisma.universityApplication.findUnique({
  //         where: {
  //           id: application.universityApplicationId,
  //         },
  //       });

  //     if (!universityApplication) {
  //       return null;
  //     }

  //     const academicYear = await prisma.academicYear.findUnique({
  //       where: { id: universityApplication.academicYearId },
  //     });

  //     if (!academicYear) {
  //       return null;
  //     }

  //     const now = moment().tz("Africa/Dar_es_Salaam");

  //     if (
  //       now.isAfter(
  //         moment(universityApplication.endTime).tz("Africa/Dar_es_Salaam"),
  //       )
  //     ) {
  //       isExpired = true;
  //     }

  //     return {
  //       id: application.id,
  //       status: application.status,
  //       academicYearName: academicYear.name,
  //       createdAt: academicYear.createdAt,
  //       end: universityApplication.endTime,
  //       isExpired,
  //     };
  //   }),
  // );

  const applications = await Promise.all(
    applicantApplications.map(async (application) => {
      let isExpired = false;

      const universityApplication =
        await prisma.universityApplication.findUnique({
          where: {
            id: application.universityApplicationId,
          },
        });

      if (!universityApplication) {
        return null;
      }

      const academicYear = await prisma.academicYear.findUnique({
        where: { id: universityApplication.academicYearId },
      });

      if (!academicYear) {
        return null;
      }

      const now = moment().tz("Africa/Dar_es_Salaam");

      if (
        now.isAfter(
          moment(universityApplication.endTime).tz("Africa/Dar_es_Salaam"),
        )
      ) {
        isExpired = true;
      }

      return {
        id: application.id,
        status: application.status,
        academicYearName: academicYear.name,
        createdAt: academicYear.createdAt,
        end: universityApplication.endTime,
        isExpired,
      };
    }),
  );

  const filteredApplications = applications.filter(
    (item) => item !== null,
  ) as ApplicantApplication[];

  return {
    canCreateNewApplication: !canCreateApp,
    latestAcademicYearName: latestAcademicYear.name,
    applications: filteredApplications,
  };
};

// SERVER ////////////////////////////////////////////////////
