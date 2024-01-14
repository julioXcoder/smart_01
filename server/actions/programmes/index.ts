"use server";
import prisma from "@/prisma/db";
import { ProgrammeResponse, Programme } from "./types";

export const getAllProgrammes = async (): Promise<ProgrammeResponse> => {
  try {
    const programmes = await prisma.programme.findMany();

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
      })
    );

    // Filter out the null values
    const validProgrammes = result.filter(
      (programme) => programme !== null
    ) as Programme[];

    return { data: validProgrammes, error: null };
  } catch (error) {
    return {
      data: null,
      error: "An error occurred while fetching programmes.",
    };
  }
};
