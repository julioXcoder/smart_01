"use server";

import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import { z } from "zod";
import moment from "moment-timezone";
import { FormSchema } from "./data";
import { revalidatePath } from "next/cache";

const baseUrl =
  "/university_administration/institutional-development/department";

export const getDepartments = async () => {
  const departments = await prisma.department.findMany({
    include: { college: { include: { campus: true } } },
  });

  return departments;
};

export const addDepartment = async (data: z.infer<typeof FormSchema>) => {
  await prisma.department.create({
    data: {
      name: data.name,
      college: {
        connect: { id: data.collegeId },
      },
    },
  });

  revalidatePath(baseUrl);
};
