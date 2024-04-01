"use server";

import prisma from "@/prisma/db";
import moment from "moment-timezone";
import { revalidatePath } from "next/cache";

export const createNewAcademicYear = async ({
  name,
  startTime,
  endTime,
}: {
  name: string;
  startTime: Date;
  endTime: Date;
}) => {
  const now = new Date();

  await prisma.academicYear.create({
    data: {
      createdAt: now,
      name,
      applicationStartTime: startTime,
      applicationEndTime: endTime,
    },
  });

  revalidatePath("/management/new_academic_year");
};

export const getCurrentYear = async () => {
  const latestAcademicYear = await prisma.academicYear.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!latestAcademicYear) return null;

  return latestAcademicYear.name;
};
