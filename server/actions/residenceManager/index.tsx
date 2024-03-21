"use server";

import { FormSchema } from "@/app/management/residence-administrator/residenceManagerForm";
import { z } from "zod";
import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";

export async function createResidenceManager(
  formData: z.infer<typeof FormSchema>,
) {
  await prisma.residenceManager.create({
    data: formData,
  });

  revalidatePath("/management/residence-administrator");
}
