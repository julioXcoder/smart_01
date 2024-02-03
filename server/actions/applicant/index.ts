"use server";

import * as cheerio from "cheerio";
import axios from "axios";
import type {
  GetFormIVDataResponse,
  StudentInfo,
  NewApplicant,
  NewApplicantResponse,
  ApplicantData,
  ApplicantDataResponse,
  ApplicationStatusResponse,
} from "./schema";
import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import { createToken } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { logOperationError } from "@/utils/logger";
import { redirect } from "next/navigation";

const baseURL = "https://onlinesys.necta.go.tz/results/";

const redirectToAuth = async () => {
  const headersList = headers();
  const username = headersList.get("userId");

  if (!username) {
    cookies().set("token", "");
    return redirect("/applicant_portal/auth");
  }

  const applicant = await prisma.applicant.findUnique({
    where: {
      username,
    },
  });

  if (!applicant) {
    cookies().set("token", "");
    return redirect("/applicant_portal/auth");
  }

  return applicant;
};

const getProgrammePriorities = async (programmes: string[]) => {
  const applicantPrograms = await prisma.applicantProgrammes.findMany({
    where: {
      programmeCode: {
        in: programmes,
      },
    },
    select: {
      id: false, // Exclude the 'id' field
      applicantUsername: false,
      programmeCode: true,
      priority: true,
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
): Promise<NewApplicantResponse> => {
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
        formIVIndex,
        applicationType,
        origin,
        highestEducationLevel,
      },
    });

    await prisma.applicantProfile.create({
      data: {
        applicantUsername: newApplicant.username,
        firstName,
        middleName,
        lastName,
      },
    });

    await prisma.applicantContacts.create({
      data: {
        applicantUsername: newApplicant.username,
      },
    });

    await prisma.applicantEmergencyContacts.create({
      data: {
        applicantUsername: newApplicant.username,
      },
    });

    const data = { id: newApplicant.username, role: newApplicant.role };

    const token = await createToken(data);

    cookies().set("token", token);

    return { data: "/applicant_portal/dashboard" };
  } catch (error) {
    logOperationError(error);
    return {
      error:
        "We’re sorry, but we were unable to create your account at this time. Please try again later, and if the problem persists, reach out to our support team for assistance.",
    };
  }
};

export const getApplicantData = async (): Promise<ApplicantDataResponse> => {
  try {
    const applicant = await redirectToAuth();

    const profile = await prisma.applicantProfile.findUnique({
      where: {
        applicantUsername: applicant.username,
      },
    });

    if (!profile) {
      throw new Error(
        `Unable to locate the profile for the applicant with the username: ${applicant.username}.`,
      );
    }

    const { firstName, middleName, lastName, imageUrl } = profile;

    const notifications = await prisma.applicantNotification.findMany({
      where: {
        applicantUsername: applicant.username,
      },
    });

    return {
      data: {
        username: applicant.username,
        firstName,
        middleName,
        lastName,
        imageUrl,
        notifications,
      },
    };
  } catch (error) {
    logOperationError(error);
    return {
      error:
        "Apologies for the inconvenience. We encountered an issue while retrieving your applicant data. Please reach out to our dedicated support team for further assistance. We appreciate your understanding and patience",
    };
  }
};

export const getApplicationStatus =
  async (): Promise<ApplicationStatusResponse> => {
    try {
      const applicant = await redirectToAuth();

      const { applicationType, applicationStatus, programmes } = applicant;

      const programmePriorities = await getProgrammePriorities(programmes);

      return {
        data: {
          applicationType,
          applicationStatus,
          programmePriorities,
        },
      };
    } catch (error) {
      logOperationError(error);
      return {
        error:
          "We’re sorry, but an issue arose while retrieving your application details. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
      };
    }
  };

export const getApplicationDetails = async () => {
  try {
    const applicant = await redirectToAuth();

    const { applicationType, applicationStatus, programmes } = applicant;

    const programmePriorities = await getProgrammePriorities(programmes);
  } catch (error) {}
};
