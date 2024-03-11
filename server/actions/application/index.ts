"use server";

import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import moment from "moment-timezone";
import { revalidatePath } from "next/cache";
import { getSession, setSession } from "@/lib";
import { ApplicantApplication, NewApplicant } from "./schema";
import { redirect } from "next/navigation";
import { ApplicantProgram } from "@/types/application";
import { ApplicantFormData } from "@/components/applicant/data";
import { Programme } from "@/types/draftProgrammes";
import { utapi } from "@/server/uploadthing";
import { logError } from "@/utils/logger";

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

function isValidObjectId(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

const getApplicantApplication = async (applicantApplicationId: string) => {
  if (!isValidObjectId(applicantApplicationId)) {
    throw new Error("Invalid ObjectId");
  }

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

  return applicantApplication;
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
        academicYearId: latestAcademicYear.id,
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

    return {
      redirect: "/application-portal/my-applications",
    };
  } catch (error) {
    return {
      message:
        "We’re sorry, but we were unable to create your account at this time. Please try again later, and if the problem persists, reach out to our support team for assistance.",
    };
  }
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

    return {
      redirect: "/application-portal/my-applications",
    };
  } catch (error) {
    return {
      message:
        "We’re sorry, but an issue arose while signing in. Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
    };
  }
};

export const addApplicantProgrammePriority = async (
  programmeCode: string,
  applicantApplicationId: string,
  priority: number,
) => {
  const applicantApplication = await getApplicantApplication(
    applicantApplicationId,
  );

  // Find the programme by its code
  const programme = await prisma.programme.findUnique({
    where: {
      code: programmeCode,
    },
  });

  if (!programme)
    throw new Error("The programme code you provided does not exist.");

  const newProgramme = await prisma.applicantProgrammes.create({
    data: {
      applicantApplicationId: applicantApplication.id,
      programmeCode: programme.code,
      priority,
    },
  });

  return newProgramme;
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

  const canCreateApp = applicantApplications.some(
    (application) => application.academicYearId === latestAcademicYear.id,
  );

  const applications = await Promise.all(
    applicantApplications.map(async (application) => {
      let isExpired = false;

      const academicYear = await prisma.academicYear.findUnique({
        where: { id: application.academicYearId },
      });

      if (!academicYear) {
        return null;
      }

      const now = moment().tz("Africa/Dar_es_Salaam");

      if (
        now.isAfter(
          moment(academicYear.applicationEndTime).tz("Africa/Dar_es_Salaam"),
        )
      ) {
        isExpired = true;
      }

      return {
        id: application.id,
        status: application.status,
        academicYearName: academicYear.name,
        createdAt: academicYear.createdAt,
        end: academicYear.applicationEndTime,
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
  const applicantApplication = await getApplicantApplication(
    applicantApplicationId,
  );

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

  const academicYear = await prisma.academicYear.findUnique({
    where: {
      id: applicantApplication.academicYearId,
    },
  });

  const programmes = await prisma.programme.findMany({
    where: {
      level: applicantApplication.type,
    },
  });
  const result = await Promise.all(
    programmes.map(async (programme) => {
      const department = await prisma.department.findUnique({
        where: { id: programme.departmentId },
      });

      if (!department) {
        return null;
      }

      const college = await prisma.college.findUnique({
        where: { id: department.collegeId },
      });

      if (!college) {
        return null;
      }

      const campus = await prisma.campus.findUnique({
        where: { id: college.campusId },
      });

      if (!campus) {
        return null;
      }

      return {
        ...programme,
        department: department,
        college: college,
        campus: campus,
      };
    }),
  );

  // Filter out the null values
  const validProgrammes = result.filter(
    (programme) => programme !== null,
  ) as Programme[];

  if (
    !applicantProfile ||
    !applicantContacts ||
    !applicantEmergencyContacts ||
    !applicantImageData ||
    !applicantEducationFileData ||
    !applicantControlNumber ||
    !academicYear
  ) {
    throw new Error(
      `Unable to locate the applicant details for the applicant with the username: ${applicantApplication.applicantUsername}.`,
    );
  }

  return {
    username: applicantApplication.applicantUsername,
    academicYearName: academicYear.name,
    programmes: validProgrammes,
    status: applicantApplication.status,
    applicationData: {
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
    },
  };
};

export const deleteApplicantProgramme = async (
  priorityProgramme: ApplicantProgram,
  applicantApplicationId: string,
) => {
  const applicantApplication = await getApplicantApplication(
    applicantApplicationId,
  );

  await prisma.applicantProgrammes.delete({
    where: {
      id: priorityProgramme.id,
      applicantApplicationId: applicantApplication.id,
    },
  });

  revalidatePath(`/application-portal/draft/${applicantApplication.id}`);
};

export const addApplicantImageData = async (
  applicantImageData: {
    key: string;
    url: string;
    name: string;
    size: number;
  },
  applicantApplicationId: string,
) => {
  const applicantApplication = await getApplicantApplication(
    applicantApplicationId,
  );

  await prisma.applicantImageData.update({
    where: {
      applicantApplicationId: applicantApplication.id,
    },
    data: {
      imageUrl: applicantImageData.url,
      key: applicantImageData.key,
      name: applicantImageData.name,
      size: applicantImageData.size,
    },
  });

  revalidatePath(`/application-portal/draft/${applicantApplication.id}`);
};

export const deleteApplicantImageData = async (
  applicantApplicationId: string,
) => {
  const applicantApplication = await getApplicantApplication(
    applicantApplicationId,
  );

  await prisma.applicantImageData.update({
    where: {
      applicantApplicationId: applicantApplication.id,
    },
    data: {
      imageUrl: "",
      key: "",
      name: "",
      size: 0,
    },
  });

  revalidatePath(`/application-portal/draft/${applicantApplication.id}`);
};

export const deleteApplicantEducationFileData = async (
  applicantApplicationId: string,
) => {
  const applicantApplication = await getApplicantApplication(
    applicantApplicationId,
  );

  await prisma.applicantEducationFileData.update({
    where: {
      applicantApplicationId: applicantApplication.id,
    },
    data: {
      url: "",
      key: "",
      name: "",
      type: "",
      size: 0,
    },
  });

  revalidatePath(`/application-portal/draft/${applicantApplication.id}`);
};

export const addApplicantEducationFile = async (
  applicantEducationFileData: {
    key: string;
    url: string;
    name: string;
    size: number;
  },
  fileType: string,
  applicantApplicationId: string,
) => {
  const applicantApplication = await getApplicantApplication(
    applicantApplicationId,
  );

  await prisma.applicantEducationFileData.update({
    where: {
      applicantApplicationId: applicantApplication.id,
    },
    data: {
      url: applicantEducationFileData.url,
      key: applicantEducationFileData.key,
      name: applicantEducationFileData.name,
      size: applicantEducationFileData.size,
      type: fileType,
    },
  });

  revalidatePath(`/application-portal/draft/${applicantApplication.id}`);
};

export const deleteApplicantAdditionalFileData = async (
  id: string,
  applicantApplicationId: string,
) => {
  await prisma.applicantAdditionalFileData.delete({
    where: {
      id,
    },
  });

  revalidatePath(`/application-portal/draft/${applicantApplicationId}`);
};

export const addApplicantAdditionalFile = async (
  applicantEducationFileData: {
    key: string;
    url: string;
    name: string;
    size: number;
  },
  fileType: string,
  applicantApplicationId: string,
) => {
  const applicantApplication = await getApplicantApplication(
    applicantApplicationId,
  );

  await prisma.applicantAdditionalFileData.create({
    data: {
      applicantApplicationId: applicantApplication.id,
      url: applicantEducationFileData.url,
      key: applicantEducationFileData.key,
      name: applicantEducationFileData.name,
      size: applicantEducationFileData.size,
      type: fileType,
    },
  });

  revalidatePath(`/application-portal/draft/${applicantApplication.id}`);
};

export const saveApplicationData = async (
  applicantFormData: ApplicantFormData,
  applicantApplicationId: string,
) => {
  const {
    firstName,
    middleName,
    lastName,
    nida,
    applicantEmail,
    applicantPhoneNumber,
    citizenship,
    country,
    emergencyContactCity,
    emergencyContactCountry,
    emergencyContactEmail,
    emergencyContactPhoneNumber,
    emergencyContactPostalCode,
    emergencyContactRegion,
    emergencyContactRelation,
    emergencyContactStreetAddress,
    city,
    gender,
    region,
    postalCode,
    streetAddress,
    emergencyContactFullName,
    applicantAlternativeEmail,
    applicantAlternativePhoneNumber,
    emergencyContactAlternativeEmail,
    emergencyContactAlternativePhoneNumber,
    education,
  } = applicantFormData.formData;

  const applicantApplication = await getApplicantApplication(
    applicantApplicationId,
  );

  await prisma.applicantProfile.update({
    where: {
      applicantApplicationId: applicantApplication.id,
    },
    data: {
      nida,
      firstName,
      middleName,
      lastName,
      nationality: citizenship,
      gender,
    },
  });

  await prisma.applicantContacts.update({
    where: {
      applicantApplicationId: applicantApplication.id,
    },
    data: {
      phone: applicantPhoneNumber,
      email: applicantEmail,
      alternativeEmail: applicantAlternativeEmail,
      alternativePhoneNumber: applicantAlternativePhoneNumber,
      streetAddress,
      city,
      region,
      postalCode,
      country,
    },
  });

  await prisma.applicantEmergencyContacts.update({
    where: {
      applicantApplicationId: applicantApplication.id,
    },
    data: {
      fullName: emergencyContactFullName,
      phone: emergencyContactPhoneNumber,
      email: emergencyContactEmail,
      alternativeEmail: emergencyContactAlternativeEmail,
      alternativePhoneNumber: emergencyContactAlternativePhoneNumber,
      streetAddress: emergencyContactStreetAddress,
      city: emergencyContactCity,
      region: emergencyContactRegion,
      postalCode: emergencyContactPostalCode,
      country: emergencyContactCountry,
      relation: emergencyContactRelation,
    },
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
    await prisma.applicantProgrammes.update({
      where: { id: programme.id },
      data: {
        priority: programme.priority,
        programmeCode: programme.programmeCode,
      },
    });
  }

  revalidatePath(`/application-portal/draft/${applicantApplication.id}`);
};

export const submitApplicantApplication = async (
  applicantApplicationId: string,
) => {
  const applicantApplication = await getApplicantApplication(
    applicantApplicationId,
  );

  await prisma.applicantApplication.update({
    where: {
      id: applicantApplication.id,
    },
    data: {
      status: "UNDER_REVIEW",
    },
  });

  redirect("/application-portal/my-applications");
};

export const isApplicationPeriodOpen = async () => {
  const latestAcademicYear = await prisma.academicYear.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!latestAcademicYear) {
    throw new Error("Latest Academic Year not found!");
  }

  const now = moment().tz("Africa/Dar_es_Salaam");

  if (
    now.isBefore(
      moment(latestAcademicYear.applicationStartTime).tz(
        "Africa/Dar_es_Salaam",
      ),
    ) ||
    now.isAfter(
      moment(latestAcademicYear.applicationEndTime).tz("Africa/Dar_es_Salaam"),
    )
  )
    return "CLOSED";

  return "OPEN";
};

export const generateControlNumber = async (applicantApplicationId: string) => {
  const applicantApplication = await getApplicantApplication(
    applicantApplicationId,
  );

  // FIXME: use api to get control number
  const controlNumber = Math.floor(Math.random() * 900000000000) + 100000000000;

  const controlNumberString = controlNumber.toString();

  await prisma.applicationPayment.update({
    where: { applicantApplicationId: applicantApplication.id },
    data: {
      controlNumber: controlNumberString,
    },
  });

  revalidatePath(`/applicant-portal/draft/${applicantApplication.id}`);
};

export const addApplicantEducationBackground = async (
  position: number,
  applicantApplicationId: string,
) => {
  if (position < 0 || position > 5)
    throw new Error("The provided position is invalid.");

  const applicantApplication = await getApplicantApplication(
    applicantApplicationId,
  );

  const newEducation = await prisma.applicantEducationBackground.create({
    data: {
      applicantApplicationId: applicantApplication.id,
      position,
    },
  });

  return newEducation.id;
};

export const deleteApplicantEducationBackground = async (
  itemId: string,
  applicantApplicationId: string,
) => {
  await prisma.applicantEducationBackground.delete({
    where: {
      id: itemId,
    },
  });

  revalidatePath(`/application-portal/draft/${applicantApplicationId}`);
};

// SERVER ////////////////////////////////////////////////////
