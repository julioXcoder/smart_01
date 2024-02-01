"use server";

import * as cheerio from "cheerio";
import axios from "axios";
import type {
  GetFormIVDataResponse,
  StudentInfo,
  NewApplicant,
  NewApplicantResponse,
} from "./schema";
import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import { createToken } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { logOperationError } from "@/utils/logger";

const baseURL = "https://onlinesys.necta.go.tz/results/";

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
      firstName,
      middleName,
      lastName,
      formIVIndex,
      password,
      origin,
      highestEducationLevel,
      applicationType,
    } = newApplicantData;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newApplicant = await prisma.applicant.create({
      data: {
        username,
        firstName,
        middleName,
        lastName,
        hashedPassword,
      },
    });

    const newApplication = await prisma.applicantApplication.create({
      data: {
        formIVIndex,
        applicationType,
        origin,
        highestEducationLevel,
        applicantUsername: newApplicant.username,
      },
    });

    await prisma.applicant.update({
      where: { username },
      data: {
        applications: { push: newApplication.id },
      },
    });

    // FIXME: Login user then return link

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
