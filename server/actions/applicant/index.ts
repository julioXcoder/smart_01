"use server";

import * as cheerio from "cheerio";
import axios from "axios";
import type {
  GetFormIVDataResponse,
  StudentInfo,
  NewApplicant,
  AuthorizeApplicantResponse,
  NewApplicantResponse,
  ApplicationDetailsResponse,
  ApplicantDataResponse,
  ApplicationStatusResponse,
  AddApplicantProgrammeResponse,
  DeleteApplicantProgrammeResponse,
  ApplicantFormData,
  SaveApplicationDataResponse,
} from "./schema";
import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import { createToken } from "@/lib/auth";
import { cookies, headers } from "next/headers";

import { logOperationError } from "@/utils/logger";
import { revalidatePath } from "next/cache";
import { ApplicantProgram, ApplicantImageData } from "@/types/application";

const baseURL = "https://onlinesys.necta.go.tz/results/";

const getProgrammePriorities = async (username: string) => {
  const applicantPrograms = await prisma.applicantProgrammes.findMany({
    where: {
      applicantUsername: username,
    },
    select: {
      id: true, // Exclude the 'id' field
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

    await prisma.applicantImageData.create({
      data: {
        applicantUsername: newApplicant.username,
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
  const username = headers().get("userId");
  try {
    if (!username) {
      return { error: "Oops! Access denied. Please try again." };
    }

    const applicant = await prisma.applicant.findUnique({
      where: {
        username,
      },
    });

    if (!applicant) {
      return {
        error:
          "Sorry, we couldn't process your request. Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
      };
    }

    const profile = await prisma.applicantProfile.findUnique({
      where: {
        applicantUsername: applicant.username,
      },
    });

    const applicantImageData = await prisma.applicantImageData.findUnique({
      where: {
        applicantUsername: applicant.username,
      },
    });

    if (!profile || !applicantImageData) {
      throw new Error(
        `Unable to locate the profile or image data for the applicant with the username: ${applicant.username}.`,
      );
    }

    const { firstName, middleName, lastName } = profile;

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
        imageUrl: applicantImageData.imageUrl,
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
    const username = headers().get("userId");
    try {
      if (!username) {
        return { error: "Oops! Access denied. Please try again." };
      }

      const applicant = await prisma.applicant.findUnique({
        where: {
          username,
        },
      });

      if (!applicant) {
        return {
          error:
            "Sorry, we couldn't process your request. Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
        };
      }

      const { applicationType, applicationStatus } = applicant;

      const programmePriorities = await getProgrammePriorities(
        applicant.username,
      );

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
          "We’re sorry, but an issue arose while retrieving your application status. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
      };
    }
  };

export const getApplicationDetails =
  async (): Promise<ApplicationDetailsResponse> => {
    const username = headers().get("userId");
    try {
      if (!username) {
        return { error: "Oops! Access denied. Please try again." };
      }

      const applicant = await prisma.applicant.findUnique({
        where: {
          username,
        },
      });

      if (!applicant) {
        return {
          error:
            "Sorry, we couldn't process your request. Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
        };
      }
      const { educationBackground } = applicant;

      const programmePriorities = await getProgrammePriorities(
        applicant.username,
      );

      const applicantEducationBackground =
        await prisma.applicantEducationBackground.findMany({
          where: {
            id: {
              in: educationBackground,
            },
          },
        });

      const applicantProfile = await prisma.applicantProfile.findUnique({
        where: {
          applicantUsername: applicant.username,
        },
      });

      const applicantContacts = await prisma.applicantContacts.findUnique({
        where: {
          applicantUsername: applicant.username,
        },
      });

      const applicantEmergencyContacts =
        await prisma.applicantEmergencyContacts.findUnique({
          where: {
            applicantUsername: applicant.username,
          },
        });

      const applicantImageData = await prisma.applicantImageData.findUnique({
        where: {
          applicantUsername: applicant.username,
        },
      });

      if (
        !applicantProfile ||
        !applicantContacts ||
        !applicantEmergencyContacts ||
        !applicantImageData
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

export const addApplicantProgrammePriority = async (
  programmeCode: string,
): Promise<AddApplicantProgrammeResponse> => {
  const username = headers().get("userId");
  try {
    if (!username) {
      return { error: "Oops! Access denied. Please try again." };
    }

    const applicant = await prisma.applicant.findUnique({
      where: {
        username,
      },
    });

    if (!applicant) {
      return {
        error:
          "Sorry, we couldn't process your request. Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
      };
    }

    const programmePriorities = await getProgrammePriorities(
      applicant.username,
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
        applicantUsername: applicant.username,
        programmeCode: programme.code,
        priority: programmesLength + 1,
      },
    });

    revalidatePath("/applicant_portal/edit");
    return { data: "/applicant_portal/edit" };
  } catch (error) {
    logOperationError(error);
    return {
      error:
        "We’re sorry, but an issue arose while adding applicant programme priority.",
    };
  }
};

export const deleteApplicantProgrammePriority = async (
  priorityProgramme: ApplicantProgram,
): Promise<DeleteApplicantProgrammeResponse> => {
  const username = headers().get("userId");
  try {
    if (!username) {
      return { error: "Oops! Access denied. Please try again." };
    }

    const applicant = await prisma.applicant.findUnique({
      where: {
        username,
      },
    });

    if (!applicant) {
      return {
        error:
          "Sorry, we couldn't process your request. Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
      };
    }

    const applicantPriorityProgramme =
      await prisma.applicantProgrammes.findUnique({
        where: {
          id: priorityProgramme.id,
          applicantUsername: applicant.username,
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

    revalidatePath("/applicant_portal/edit");
    return { data: "Programme Deleted!" };
  } catch (error) {
    logOperationError(error);
    return {
      error:
        "We’re sorry, but an issue arose while deleting applicant programme priority.",
    };
  }
};

export const saveApplicationData = async (
  applicantFormData: ApplicantFormData,
) => {
  const username = headers().get("userId");

  if (!username) {
    throw new Error("Applicant details now found!");
  }

  const applicant = await prisma.applicant.findUnique({
    where: {
      username,
    },
  });

  if (!applicant) {
    throw new Error("Applicant details now found!");
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
      applicantUsername: applicant.username,
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
      applicantUsername: applicant.username,
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
      applicantUsername: applicant.username,
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

  revalidatePath("/applicant_portal/edit");
  //   try{

  //   return { data: "Draft saved. Resume anytime." };
  // } catch (error) {
  //   return {
  //     error: "Oops! There was an error saving your draft.",
  //   };
  // }
};

export const authorizeApplicant = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<AuthorizeApplicantResponse> => {
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

    const token = await createToken(data);

    cookies().set("token", token);

    return { data: "/applicant_portal/dashboard" };
  } catch (error) {
    logOperationError(error);
    return {
      error:
        "We’re sorry, but an issue arose while signing in. Please try again later. For further assistance, please don’t hesitate to reach out to our dedicated support team.",
    };
  }
};

export const addApplicantImageData = async (applicantImageData: {
  key: string;
  url: string;
  name: string;
  size: number;
}) => {
  const username = headers().get("userId");

  if (!username) {
    throw new Error("Applicant details now found!");
  }

  const applicant = await prisma.applicant.findUnique({
    where: {
      username,
    },
  });

  if (!applicant) {
    throw new Error("Applicant details now found!");
  }

  await prisma.applicantImageData.update({
    where: {
      applicantUsername: applicant.username,
    },
    data: {
      imageUrl: applicantImageData.url,
      key: applicantImageData.key,
      name: applicantImageData.name,
      size: applicantImageData.size,
    },
  });

  revalidatePath("/applicant_portal/edit");
};
