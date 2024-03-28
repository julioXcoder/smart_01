"use server";

import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import { z } from "zod";
import moment from "moment-timezone";
import { FormSchema } from "./data";
import { revalidatePath } from "next/cache";

const baseUrl =
  "/university_administration/institutional-development/programme";

export const getProgrammes = async () => {
  const programmes = await prisma.programme.findMany({
    include: { department: true },
  });

  return programmes;
};

export const addProgramme = async (data: z.infer<typeof FormSchema>) => {
  await prisma.programme.create({
    data: {
      ...data,
      department: {
        connect: { id: data.department },
      },
    },
  });

  revalidatePath(baseUrl);
};
