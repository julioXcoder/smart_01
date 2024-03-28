"use server";

import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import { z } from "zod";
import moment from "moment-timezone";
import { FormSchema } from "./data";
import { revalidatePath } from "next/cache";

const baseUrl = "/university_administration/institutional-development/campus";

export const getCampuses = async () => {
  const campuses = await prisma.campus.findMany();

  return campuses;
};

export const addCampus = async (data: z.infer<typeof FormSchema>) => {
  await prisma.campus.create({
    data,
  });

  revalidatePath(baseUrl);
};
