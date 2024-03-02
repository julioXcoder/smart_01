"use server";

import { getSession, setSession } from "@/lib";
import prisma from "@/prisma/db";
import { ApplicantProgram } from "@/types/application";
import { Programme } from "@/types/university";
import { logOperationError } from "@/utils/logger";
import axios from "axios";
import bcrypt from "bcrypt";
import * as cheerio from "cheerio";
import moment from "moment-timezone";
import { revalidatePath } from "next/cache";
import type {
  ApplicantApplication,
  ApplicantDataResponse,
  ApplicantDetailsResponse,
  ApplicantFormData,
  ApplicantProgrammesResponse,
  ApplicationDetailsResponse,
  ApplicationPeriodResponse,
  GenericResponse,
  GetFormIVDataResponse,
  NewApplicant,
  StudentInfo,
} from "./schema";

const baseURL = "https://onlinesys.necta.go.tz/results/";

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
          `No ProgrammeDetails found for programmeCode: ${program.programmeCode}`,
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

export const getFormIVData = async (
  formIVIndex: string,
): Promise<GetFormIVDataResponse> => {
  try {
    const parts = formIVIndex.split("/");

    // Extract the candidate type, the school number, the candidate number, and the year of completion from the array
    const candidateType = parts[0].charAt(0); // The first character of the first element
    const schoolNumber = parts[0].slice(1); // The rest of the first element
    const candidateNumber = parts[1]; // The second element
    const yearOfCompletion = parts[2]; // The third element

    // Construct the URL for the NECTA website
    const url = `${baseURL}${yearOfCompletion}/csee/results/${candidateType.toLocaleLowerCase()}${schoolNumber}.htm`;
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const resultsTable = $("table")
      .filter(function () {
        const tds = $(this).find("tbody tr:first-child td");
        if (tds.length < 5) {
          return false;
        }
        const texts = tds
          .map(function () {
            return $(this).text().trim();
          })
          .get();
        return (
          texts[0] === "CNO" &&
          texts[1] === "SEX" &&
          texts[2] === "AGGT" &&
          texts[3] === "DIV" &&
          texts[4] === "DETAILED SUBJECTS"
        );
      })
      .first();

    const students: StudentInfo[] = [];

    resultsTable.find("tr").each((index: number, element: cheerio.Element) => {
      if (index !== 0) {
        // Skip the header row
        const columns = $(element).find("td");
        const studentInfo: StudentInfo = {
          CNO: $(columns[0]).text().trim(),
          SEX: $(columns[1]).text().trim(),
          AGGT: $(columns[2]).text().trim(),
          DIV: $(columns[3]).text().trim(),
          DETAILED_SUBJECTS: $(columns[4]).text().trim(),
          result: {}, // Initialize the result property
        };

        let myString = studentInfo.DETAILED_SUBJECTS.replace(/\s+/g, " ");

        let regex = /([A-Z\/]+(?:\s[A-Z]+)?)\s-\s'([A-Z])'/g;

        let matches = myString.match(regex);

        matches?.forEach((match) => {
          // Split each match by dash
          let subpart: string[] = match.split(" - ");
          // Get the subject and grade from the subpart
          let subject: string = subpart[0];
          let grade: string = subpart[1].replace(/'/g, ""); // Remove the single quotes
          // Assign the subject and grade to the subjects object
          studentInfo.result[subject] = grade;
        });

        students.push(studentInfo);
      }
    });

    let candidate = `${candidateType}${schoolNumber}/${candidateNumber}`;

    let student = students.find((obj) => obj.CNO === candidate);

    if (!student) throw new Error();

    return { data: student, error: "" };
  } catch (error) {
    return {
      data: {} as StudentInfo,
      error:
        "We're sorry, but the Form IV verification was unsuccessful. Please try again or reach out to our support team for further assistance.",
    };
  }
};

export const newApplicantAccount = async (
  newApplicantData: NewApplicant,
): Promise<GenericResponse> => {
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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

    const now = moment().tz("Africa/Dar_es_Salaam");

    if (
      now.isBefore(
        moment(universityApplication.startTime).tz("Africa/Dar_es_Salaam"),
      )
    ) {
      return { error: "The application period has not started yet." };
    }

    if (
      now.isAfter(
        moment(universityApplication.endTime).tz("Africa/Dar_es_Salaam"),
      )
    ) {
      return { error: "The application period has ended." };
    }

    const applicant = await prisma.applicant.findUnique({
      where: {
        username,
      },
    });

    if (applicant) {
      return { error: "username already exist." };
    }

    const newApplicant = await prisma.applicant.create({
      data: {
        username,
        hashedPassword,
      },
    });

    const newApplicantApplication = await prisma.applicantApplication.create({
      data: {
        formIVIndex,
        type: applicationType,
        origin,
        highestEducationLevel,
        applicantUsername: newApplicant.username,
        universityApplicationId: universityApplication.id,
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

    return { data: "/applicant_portal/applications" };
  } catch (error) {
    logOperationError(error, "newApplicantAccount");
    return {
      error:
        "We’re sorry, but we were unable to create your account at this time. Please try again later, and if the problem persists, reach out to our support team for assistance.",
    };
  }
};

export const getApplicantData = async (): Promise<ApplicantDataResponse> => {
  const userSession = await getSession();
  try {
    if (!userSession) {
      return { error: "Oops! Access denied. Please try again." };
    }

    const applicant = await prisma.applicant.findUnique({
      where: {
        username: userSession.id,
      },
    });

    if (!applicant) {
      return {
        error:
          "Sorry, we couldn't process your request. Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
      };
    }

    const notifications = await prisma.applicantNotification.findMany({
      where: {
        applicantUsername: applicant.username,
      },
    });

    const applicantApplications = await prisma.applicantApplication.findMany({
      where: {
        applicantUsername: applicant.username,
      },
    });

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

    const canCreateApp = applicantApplications.some(
      (application) =>
        application.universityApplicationId === universityApplication.id,
    );

    const results = await Promise.all(
      applicantApplications.map(async (application) => {
        let isExpired = false;

        const universityApplication =
          await prisma.universityApplication.findUnique({
            where: {
              id: application.universityApplicationId,
            },
          });

        if (!universityApplication) return null;

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

        const programmePriorities = await getProgrammePriorities(
          application.id,
        );

        return {
          id: application.id,
          status: application.status,
          type: application.type,
          year: academicYear.name,
          createdAt: academicYear.createdAt,
          start: universityApplication.startTime,
          end: universityApplication.endTime,
          programmePriorities,
          isExpired,
        };
      }),
    );

    const filteredResult = results.filter(
      (item) => item !== null,
    ) as ApplicantApplication[];

    const sortedResults = filteredResult.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );

    const groupedByYear = sortedResults.reduce(
      (acc: { year: string; applications: ApplicantApplication[] }[], curr) => {
        const existingYear = acc.find((item) => item.year === curr.year);

        if (existingYear) {
          existingYear.applications.push(curr);
        } else {
          acc.push({
            year: curr.year,
            applications: [curr],
          });
        }
        return acc;
      },
      [] as { year: string; applications: ApplicantApplication[] }[],
    );

    return {
      data: {
        username: applicant.username,
        notifications,
        years: groupedByYear,
        canCreateApp: !canCreateApp,
        latestAcademicYearName: latestAcademicYear.name,
      },
    };
  } catch (error) {
    logOperationError(error, "getApplicantData");
    return {
      error:
        "Apologies for the inconvenience. We encountered an issue while retrieving your applicant data. Please reach out to our dedicated support team for further assistance. We appreciate your understanding and patience",
    };
  }
};

// FIXME: Remove
export const getApplicantDetails = async (
  applicantApplicationId: string,
): Promise<ApplicantDetailsResponse> => {
  const userSession = await getSession();
  try {
    if (!userSession) {
      return { error: "Oops! Access denied. Please try again." };
    }

    const applicant = await prisma.applicant.findUnique({
      where: {
        username: userSession.id,
      },
    });

    if (!applicant) {
      return {
        error:
          "Sorry, we couldn't process your request. Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
      };
    }

    const applicantApplication = await prisma.applicantApplication.findUnique({
      where: {
        id: applicantApplicationId,
        applicantUsername: applicant.username,
      },
    });

    if (!applicantApplication) {
      return {
        error:
          "We're sorry, but we couldn't find the application you're looking for. Please double-check your information and try again.",
      };
    }

    const applicantProfile = await prisma.applicantProfile.findUnique({
      where: {
        applicantApplicationId: applicantApplication.id,
      },
    });

    const applicantImageData = await prisma.applicantImageData.findUnique({
      where: {
        applicantApplicationId: applicantApplication.id,
      },
    });

    if (!applicantProfile || !applicantImageData) {
      throw new Error(
        `Unable to locate the applicant details for the applicant with the username: ${applicant.username}.`,
      );
    }

    const notifications = await prisma.applicantNotification.findMany({
      where: {
        applicantUsername: applicant.username,
      },
    });

    return {
      data: {
        username: applicant.username,
        notifications,
        imageUrl: applicantImageData.imageUrl,
        firstName: applicantProfile.firstName,
        lastName: applicantProfile.lastName,
      },
    };
  } catch (error) {
    logOperationError(error, "getApplicantDetails");
    return {
      error:
        "We’re sorry, but an issue arose while retrieving your details. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
    };
  }
};

export const getApplicationDetails = async (
  applicantApplicationId: string,
): Promise<ApplicationDetailsResponse> => {
  const userSession = await getSession();
  try {
    if (!userSession) {
      return { error: "Oops! Access denied. Please try again." };
    }

    const applicant = await prisma.applicant.findUnique({
      where: {
        username: userSession.id,
      },
    });

    if (!applicant) {
      return {
        error:
          "Sorry, we couldn't process your request. Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
      };
    }

    const applicantApplication = await prisma.applicantApplication.findUnique({
      where: {
        id: applicantApplicationId,
        applicantUsername: applicant.username,
      },
    });

    if (!applicantApplication) {
      return {
        error:
          "We're sorry, but we couldn't find the application you're looking for. Please double-check your information and try again.",
      };
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
      data: {
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
      },
    };
  } catch (error) {
    logOperationError(error, "getApplicationDetails");
    return {
      error:
        "We’re sorry, but an issue arose while retrieving your application details. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
    };
  }
};

export const addApplicantProgrammePriority = async (
  programmeCode: string,
  applicantApplicationId: string,
): Promise<GenericResponse> => {
  const userSession = await getSession();
  try {
    if (!userSession) {
      return { error: "Oops! Access denied. Please try again." };
    }

    const applicant = await prisma.applicant.findUnique({
      where: {
        username: userSession.id,
      },
    });

    if (!applicant) {
      return {
        error:
          "Sorry, we couldn't process your request. Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
      };
    }

    const applicantApplication = await prisma.applicantApplication.findUnique({
      where: {
        id: applicantApplicationId,
        applicantUsername: applicant.username,
      },
    });

    if (!applicantApplication) {
      return {
        error:
          "We're sorry, but we couldn't find the application you're looking for. Please double-check your information and try again.",
      };
    }

    const programmePriorities = await getProgrammePriorities(
      applicantApplication.id,
    );

    const hasDuplicateProgrammeCode = programmePriorities.some(
      (programme) => programme.programmeCode === programmeCode,
    );

    if (hasDuplicateProgrammeCode) {
      return {
        error: "Programme already added. Please pick a different one.",
      };
    }

    const programmesLength = programmePriorities.length;

    if (programmesLength >= 5) {
      return {
        error: "Max programmes reached you cant add anymore programmes.",
      };
    }

    // Find the programme by its code
    const programme = await prisma.programme.findUnique({
      where: {
        code: programmeCode,
      },
    });

    if (!programme) {
      return {
        error: "The programme code you provided does not exist.",
      };
    }

    await prisma.applicantProgrammes.create({
      data: {
        applicantApplicationId: applicantApplication.id,
        programmeCode: programme.code,
        priority: programmesLength + 1,
      },
    });

    revalidatePath(
      `/applicant_portal/edit_application/${applicantApplication.id}`,
    );
    return {
      data: `/applicant_portal/edit_application/${applicantApplication.id}`,
    };
  } catch (error) {
    logOperationError(error, "addApplicantProgrammePriority");
    return {
      error:
        "We’re sorry, but an issue arose while adding applicant programme priority.",
    };
  }
};

export const deleteApplicantProgrammePriority = async (
  priorityProgramme: ApplicantProgram,
  applicantApplicationId: string,
): Promise<GenericResponse> => {
  const userSession = await getSession();
  try {
    if (!userSession) {
      return { error: "Oops! Access denied. Please try again." };
    }

    const applicant = await prisma.applicant.findUnique({
      where: {
        username: userSession.id,
      },
    });

    if (!applicant) {
      return {
        error:
          "Sorry, we couldn't process your request. Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
      };
    }

    const applicantApplication = await prisma.applicantApplication.findUnique({
      where: {
        id: applicantApplicationId,
        applicantUsername: applicant.username,
      },
    });

    if (!applicantApplication) {
      return {
        error:
          "We're sorry, but we couldn't find the application you're looking for. Please double-check your information and try again.",
      };
    }

    const applicantPriorityProgramme =
      await prisma.applicantProgrammes.findUnique({
        where: {
          id: priorityProgramme.id,
          applicantApplicationId: applicantApplication.id,
        },
      });

    if (!applicantPriorityProgramme) {
      return { error: "Programme not found." };
    }

    await prisma.applicantProgrammes.delete({
      where: {
        id: applicantPriorityProgramme.id,
      },
    });

    revalidatePath(
      `/applicant_portal/edit_application/${applicantApplication.id}`,
    );
    return { data: "Programme Deleted!" };
  } catch (error) {
    logOperationError(error, "deleteApplicantProgrammePriority");
    return {
      error:
        "We’re sorry, but an issue arose while deleting applicant programme priority.",
    };
  }
};

export const addApplicantEducationBackground = async (
  position: number,
  applicantApplicationId: string,
): Promise<GenericResponse> => {
  const userSession = await getSession();
  try {
    if (position > 5) {
      return { error: "You've reached the maximum limit." };
    }

    if (position < 0) {
      return { error: "The provided position is invalid." };
    }

    if (!userSession) {
      return { error: "Oops! Access denied. Please try again." };
    }

    const applicant = await prisma.applicant.findUnique({
      where: {
        username: userSession.id,
      },
    });

    if (!applicant) {
      return {
        error:
          "Sorry, we couldn't process your request. Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
      };
    }

    const applicantApplication = await prisma.applicantApplication.findUnique({
      where: {
        id: applicantApplicationId,
        applicantUsername: applicant.username,
      },
    });

    if (!applicantApplication) {
      return {
        error:
          "We're sorry, but we couldn't find the application you're looking for. Please double-check your information and try again.",
      };
    }

    const newEducation = await prisma.applicantEducationBackground.create({
      data: {
        applicantApplicationId: applicantApplication.id,
        position,
      },
    });

    return { data: newEducation.id };
  } catch (error) {
    logOperationError(error, "addApplicantEducationBackground");
    return {
      error:
        "We’re sorry, but an issue arose while adding applicant education background.",
    };
  }
};

export const deleteApplicantEducationBackground = async (
  itemId: string,
  applicantApplicationId: string,
): Promise<GenericResponse> => {
  const userSession = await getSession();
  try {
    if (!userSession) {
      return { error: "Oops! Access denied. Please try again." };
    }

    const applicant = await prisma.applicant.findUnique({
      where: {
        username: userSession.id,
      },
    });

    if (!applicant) {
      return {
        error:
          "Sorry, we couldn't process your request. Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
      };
    }

    const deleteItem = await prisma.applicantEducationBackground.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!deleteItem) {
      return { error: "Item not found." };
    }

    await prisma.applicantEducationBackground.delete({
      where: {
        id: deleteItem.id,
      },
    });

    revalidatePath(
      `/applicant_portal/edit_application/${applicantApplicationId}`,
    );
    return { data: "Removed!" };
  } catch (error) {
    logOperationError(error, "deleteApplicantEducationBackground");
    return {
      error:
        "We’re sorry, but an issue arose while deleting applicant education background.",
    };
  }
};

export const saveApplicationData = async (
  applicantFormData: ApplicantFormData,
  applicantApplicationId: string,
) => {
  const userSession = await getSession();
  try {
    // FIXME: log security error when its not an applicant
    if (!userSession || userSession.role !== "APPLICANT") {
      revalidatePath(`/applicant_portal/edit_application`);
      throw new Error("no applicant session.");
    }

    const applicant = await prisma.applicant.findUnique({
      where: {
        username: userSession.id,
      },
    });

    if (!applicant) {
      throw new Error("Applicant details not found!");
    }

    const applicantApplication = await prisma.applicantApplication.findUnique({
      where: {
        id: applicantApplicationId,
        applicantUsername: applicant.username,
      },
    });

    if (!applicantApplication) {
      throw new Error("Applicant details not found!");
    }

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

    revalidatePath(
      `/applicant_portal/edit_application/${applicantApplication.id}`,
    );
  } catch (error) {
    logOperationError(error, "saveApplicationData");
    return error;
  }
};

export const submitApplicantApplication = async (
  applicantApplicationId: string,
) => {
  const userSession = await getSession();
  try {
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

    const now = moment().tz("Africa/Dar_es_Salaam");

    if (
      now.isBefore(
        moment(universityApplication.startTime).tz("Africa/Dar_es_Salaam"),
      ) ||
      now.isAfter(
        moment(universityApplication.endTime).tz("Africa/Dar_es_Salaam"),
      )
    ) {
      throw new Error(
        "The application window has been closed. Please navigate to 'My Applications' to open a new one.",
      );
    }
    // FIXME: log security error when its not an applicant
    if (!userSession || userSession.role !== "APPLICANT") {
      revalidatePath(`/applicant_portal/edit_application`);
      throw new Error("no applicant session.");
    }

    const applicant = await prisma.applicant.findUnique({
      where: {
        username: userSession.id,
      },
    });

    if (!applicant) {
      throw new Error("Applicant details not found!");
    }

    const applicantApplication = await prisma.applicantApplication.findUnique({
      where: {
        id: applicantApplicationId,
        applicantUsername: applicant.username,
      },
    });

    if (!applicantApplication) {
      throw new Error("Applicant details not found!");
    }

    await prisma.applicantApplication.update({
      where: {
        id: applicantApplication.id,
      },
      data: {
        status: "UNDER_REVIEW",
      },
    });

    return "/applicant_portal/applications";
  } catch (error) {
    logOperationError(error, "submitApplicantApplication");
    return error;
  }
};

export const authorizeApplicant = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<GenericResponse> => {
  try {
    const applicant = await prisma.applicant.findUnique({
      where: {
        username,
      },
    });

    if (!applicant) return { error: "Invalid username or password" };

    const match = await bcrypt.compare(password, applicant.hashedPassword);

    if (!match) return { error: "Invalid username or password" };

    const data = { id: applicant.username, role: applicant.role };

    await setSession(data);

    return { data: "/applicant_portal/applications" };
  } catch (error) {
    logOperationError(error, "authorizeApplicant");
    return {
      error:
        "We’re sorry, but an issue arose while signing in. Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
    };
  }
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
  const userSession = await getSession();

  if (!userSession) {
    throw new Error("Applicant details now found!");
  }

  const applicant = await prisma.applicant.findUnique({
    where: {
      username: userSession.id,
    },
  });

  if (!applicant) {
    throw new Error("Applicant details now found!");
  }

  const applicantApplication = await prisma.applicantApplication.findUnique({
    where: {
      id: applicantApplicationId,
      applicantUsername: applicant.username,
    },
  });

  if (!applicantApplication) {
    return {
      error:
        "We're sorry, but we couldn't find the application you're looking for. Please double-check your information and try again.",
    };
  }

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

  revalidatePath(
    `/applicant_portal/edit_application/${applicantApplication.id}`,
  );
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
  const userSession = await getSession();

  if (!userSession) {
    throw new Error("Applicant details now found!");
  }

  const applicant = await prisma.applicant.findUnique({
    where: {
      username: userSession.id,
    },
  });

  if (!applicant) {
    throw new Error("Applicant details now found!");
  }

  const applicantApplication = await prisma.applicantApplication.findUnique({
    where: {
      id: applicantApplicationId,
      applicantUsername: applicant.username,
    },
  });

  if (!applicantApplication) {
    return {
      error:
        "We're sorry, but we couldn't find the application you're looking for. Please double-check your information and try again.",
    };
  }

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

  revalidatePath(
    `/applicant_portal/edit_application/${applicantApplication.id}`,
  );
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
  const userSession = await getSession();

  if (!userSession) {
    throw new Error("Applicant details now found!");
  }

  const applicant = await prisma.applicant.findUnique({
    where: {
      username: userSession.id,
    },
  });

  if (!applicant) {
    throw new Error("Applicant details now found!");
  }

  const applicantApplication = await prisma.applicantApplication.findUnique({
    where: {
      id: applicantApplicationId,
      applicantUsername: applicant.username,
    },
  });

  if (!applicantApplication) {
    return {
      error:
        "We're sorry, but we couldn't find the application you're looking for. Please double-check your information and try again.",
    };
  }

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

  revalidatePath(
    `/applicant_portal/edit_application/${applicantApplication.id}`,
  );
};

export const deleteApplicantImageData = async (
  applicantApplicationId: string,
) => {
  const userSession = await getSession();

  if (!userSession) {
    throw new Error("Applicant details now found!");
  }

  const applicant = await prisma.applicant.findUnique({
    where: {
      username: userSession.id,
    },
  });

  if (!applicant) {
    throw new Error("Applicant details now found!");
  }

  const applicantApplication = await prisma.applicantApplication.findUnique({
    where: {
      id: applicantApplicationId,
      applicantUsername: applicant.username,
    },
  });

  if (!applicantApplication) {
    return {
      error:
        "We're sorry, but we couldn't find the application you're looking for. Please double-check your information and try again.",
    };
  }

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

  revalidatePath(
    `/applicant_portal/edit_application/${applicantApplication.id}`,
  );
};

export const deleteApplicantEducationFileData = async (
  applicantApplicationId: string,
) => {
  const userSession = await getSession();

  if (!userSession) {
    throw new Error("Applicant details now found!");
  }

  const applicant = await prisma.applicant.findUnique({
    where: {
      username: userSession.id,
    },
  });

  if (!applicant) {
    throw new Error("Applicant details now found!");
  }

  const applicantApplication = await prisma.applicantApplication.findUnique({
    where: {
      id: applicantApplicationId,
      applicantUsername: applicant.username,
    },
  });

  if (!applicantApplication) {
    return {
      error:
        "We're sorry, but we couldn't find the application you're looking for. Please double-check your information and try again.",
    };
  }

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

  revalidatePath(
    `/applicant_portal/edit_application/${applicantApplication.id}`,
  );
};

export const deleteApplicantAdditionalFileData = async (
  id: string,
  applicantApplicationId: string,
) => {
  const userSession = await getSession();

  if (!userSession) {
    throw new Error("Applicant details now found!");
  }

  const applicant = await prisma.applicant.findUnique({
    where: {
      username: userSession.id,
    },
  });

  if (!applicant) {
    throw new Error("Applicant details now found!");
  }

  await prisma.applicantAdditionalFileData.delete({
    where: {
      id,
    },
  });

  revalidatePath(
    `/applicant_portal/edit_application/${applicantApplicationId}`,
  );
};

export const getApplicantProgrammes = async (
  applicantApplicationId: string,
): Promise<ApplicantProgrammesResponse> => {
  const userSession = await getSession();
  try {
    if (!userSession) {
      throw new Error("Applicant details now found!");
    }

    const applicantApplication = await prisma.applicantApplication.findUnique({
      where: {
        id: applicantApplicationId,
        applicantUsername: userSession.id,
      },
    });

    if (!applicantApplication) {
      return {
        error:
          "We're sorry, but we couldn't find the application you're looking for. Please double-check your information and try again.",
      };
    }

    const applicant = await prisma.applicant.findUnique({
      where: {
        username: userSession.id,
      },
    });

    if (!applicant) {
      throw new Error("Applicant details now found!");
    }

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

    return {
      data: {
        programmes: validProgrammes,
        status: applicantApplication.status,
      },
    };
  } catch (error) {
    logOperationError(error, "getApplicantProgrammes");
    return {
      error:
        "We’re sorry, but an issue arose while getting applicant programmes.",
    };
  }
};

export const isApplicationPeriodOpen =
  async (): Promise<ApplicationPeriodResponse> => {
    try {
      const latestAcademicYear = await prisma.academicYear.findFirst({
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!latestAcademicYear) {
        throw new Error("Latest Academic Year not found!");
      }

      const universityApplication =
        await prisma.universityApplication.findFirst({
          where: { academicYearId: latestAcademicYear.id },
        });

      if (!universityApplication) {
        throw new Error("University application not found!");
      }

      const now = moment().tz("Africa/Dar_es_Salaam");

      if (
        now.isBefore(
          moment(universityApplication.startTime).tz("Africa/Dar_es_Salaam"),
        ) ||
        now.isAfter(
          moment(universityApplication.endTime).tz("Africa/Dar_es_Salaam"),
        )
      )
        return { data: "CLOSED" };

      return { data: "OPEN" };
    } catch (error) {
      logOperationError(error, "isApplicationPeriodOpen");
      return {
        error:
          "We’re sorry, but an issue arose.  Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
      };
    }
  };

export const generateControlNumber = async (
  applicantApplicationId: string,
): Promise<GenericResponse> => {
  const userSession = await getSession();
  try {
    if (!userSession) {
      throw new Error("Applicant details now found!");
    }

    const applicant = await prisma.applicant.findUnique({
      where: {
        username: userSession.id,
      },
    });

    if (!applicant) {
      throw new Error("Applicant details now found!");
    }

    const applicantApplication = await prisma.applicantApplication.findUnique({
      where: {
        id: applicantApplicationId,
        applicantUsername: applicant.username,
      },
    });

    if (!applicantApplication) {
      return {
        error:
          "We're sorry, but we couldn't find the application you're looking for. Please double-check your information and try again.",
      };
    }

    // FIXME: use api to get control number
    const controlNumber =
      Math.floor(Math.random() * 900000000000) + 100000000000;

    const controlNumberString = controlNumber.toString();

    const newApplicationPayment = await prisma.applicationPayment.update({
      where: { applicantApplicationId: applicantApplication.id },
      data: {
        controlNumber: controlNumberString,
      },
    });

    revalidatePath(
      `/applicant_portal/edit_application/${applicantApplicationId}`,
    );
    return { data: "OK!" };
  } catch (error) {
    logOperationError(error, "generateControlNumber");
    return {
      error:
        "We’re sorry, but an issue arose while generating your control number. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
    };
  }
};
