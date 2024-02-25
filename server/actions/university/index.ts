"use server";

import prisma from "@/prisma/db";
import moment from "moment-timezone";
import { logOperationError } from "@/utils/logger";
import { revalidatePath } from "next/cache";

import type { GenericResponse } from "./schema";

const createNewAcademicYear = async ({
  name,
  startTime,
  endTime,
}: {
  name: string;
  startTime: Date;
  endTime: Date;
}): Promise<GenericResponse> => {
  try {
    const now = new Date();

    const newAcademicYear = await prisma.academicYear.create({
      data: {
        createdAt: now,
        name,
      },
    });

    const universityApplication = await prisma.universityApplication.create({
      data: {
        academicYearId: newAcademicYear.id,
        startTime,
        endTime,
      },
    });

    return { data: "OK" };
  } catch (error) {
    logOperationError(error);
    return {
      error:
        "Oops! We couldn’t create the new academic year. Please try again or reach out to our support team for further assistance.",
    };
  }
};
