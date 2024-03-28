"use server";

import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import { z } from "zod";
import moment from "moment-timezone";
import { FormSchema } from "./data";
import { revalidatePath } from "next/cache";

const baseUrl = "/university_administration/institutional-development/college";

export const getColleges = async () => {
  const colleges = await prisma.college.findMany({
    include: { campus: true },
  });

  return colleges;
};

export const addCollege = async (data: z.infer<typeof FormSchema>) => {
  await prisma.college.create({
    data: {
      name: data.name,
      campus: {
        connect: { id: data.campusId },
      },
    },
  });

  revalidatePath(baseUrl);
};
