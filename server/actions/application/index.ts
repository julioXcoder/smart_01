"use server";

import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import moment from "moment-timezone";
import { revalidatePath } from "next/cache";
import { getSession, setSession } from "@/lib";
import { ApplicantApplication, NewApplicant } from "./schema";
import { redirect } from "next/navigation";

// HELPER

export const getPayload = async () => {
  const payload = await getSession();

  if (!payload) redirect("/auth/applicant");

  return payload;
};

const getApplicant = async () => {
  const payload = await getPayload();

  const applicant = await prisma.applicant.findUnique({
    where: {
      username: payload.id,
    },
  });

  if (!applicant)
    throw new Error(
      `Unable to locate the applicant with the username: ${payload.id}.`,
    );

  return applicant;
};

const getProgrammePriorities = async (applicantApplicationId: string) => {
  const applicantPrograms = await prisma.applicantProgrammes.findMany({
    where: {
      applicantApplicationId,
    },
    select: {
      id: true, // Exclude the 'id' field
      programmeCode: true,
      priority: true,
    },
    orderBy: {
      priority: "asc",
    },
  });

  const programmePriorities = await Promise.all(
    applicantPrograms.map(async (program) => {
      const programmeDetails = await prisma.programme.findUnique({
        where: {
          code: program.programmeCode,
        },
        select: {
          name: true,
          level: true,
          language: true,
        },
      });

      if (!programmeDetails) {
        throw new Error(
          `No ProgrammeDetails found for programmeCode: ${program.programmeCode}.`,
        );
      }

      // Merge the ApplicantProgram and Programme details
      return {
        ...program,
        programmeDetails,
      };
    }),
  );

  return programmePriorities;
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
  const applicant = await getApplicant();

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

  if (!latestAcademicYear)
    throw new Error(
      "It appears that an academic year has not yet been established. Please proceed with creating a new academic year.",
    );

  const universityApplication = await prisma.universityApplication.findFirst({
    where: { academicYearId: latestAcademicYear.id },
  });

  if (!universityApplication)
    throw new Error(
      `Unfortunately, we could not find a university application associated with the academic year ID: ${latestAcademicYear.id}. Please verify the ID.`,
    );

  const canCreateApp = applicantApplications.some(
    (application) =>
      application.universityApplicationId === universityApplication.id,
  );

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

export const getApplicationDetails = async (applicantApplicationId: string) => {
  const applicant = await getApplicant();

  const applicantApplication = await prisma.applicantApplication.findUnique({
    where: {
      id: applicantApplicationId,
      applicantUsername: applicant.username,
    },
  });

  if (!applicantApplication) {
    throw new Error(
      `We’re sorry, but we couldn’t find an application for the applicant with the username ${applicant.username} and the application ID ${applicantApplicationId}. Please verify the details.`,
    );
  }

  const programmePriorities = await getProgrammePriorities(
    applicantApplication.id,
  );

  const educationBackgrounds =
    await prisma.applicantEducationBackground.findMany({
      where: {
        applicantApplicationId: applicantApplication.id,
      },
      orderBy: {
        position: "asc",
      },
    });

  const applicantEducationBackground = educationBackgrounds.map((item) => {
    const { id, ...rest } = item;
    return { _id: id, ...rest };
  });

  const applicantProfile = await prisma.applicantProfile.findUnique({
    where: {
      applicantApplicationId: applicantApplication.id,
    },
  });

  const applicantContacts = await prisma.applicantContacts.findUnique({
    where: {
      applicantApplicationId: applicantApplication.id,
    },
  });

  const applicantEmergencyContacts =
    await prisma.applicantEmergencyContacts.findUnique({
      where: {
        applicantApplicationId: applicantApplication.id,
      },
    });

  const applicantImageData = await prisma.applicantImageData.findUnique({
    where: {
      applicantApplicationId: applicantApplication.id,
    },
  });

  const applicantEducationFileData =
    await prisma.applicantEducationFileData.findUnique({
      where: {
        applicantApplicationId: applicantApplication.id,
      },
    });

  const applicantAdditionalFileData =
    await prisma.applicantAdditionalFileData.findMany({
      where: {
        applicantApplicationId: applicantApplication.id,
      },
    });

  const applicantControlNumber = await prisma.applicationPayment.findUnique({
    where: {
      applicantApplicationId: applicantApplication.id,
    },
  });

  if (
    !applicantProfile ||
    !applicantContacts ||
    !applicantEmergencyContacts ||
    !applicantImageData ||
    !applicantEducationFileData ||
    !applicantControlNumber
  ) {
    throw new Error(
      `Unable to locate the applicant details for the applicant with the username: ${applicant.username}.`,
    );
  }

  return {
    username: applicant.username,
    programmePriorities,
    applicantEducationBackground,
    applicantProfile,
    applicantImageData,
    applicantContacts,
    applicantEmergencyContacts,
    applicantHighestEducation: applicantApplication.highestEducationLevel,
    applicantEducationFileData,
    applicantAdditionalFileData,
    applicantControlNumber,
    status: applicantApplication.status,
  };
};

// SERVER ////////////////////////////////////////////////////
