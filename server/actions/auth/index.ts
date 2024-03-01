"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const logoutUser = async (user: string) => {
  // users / student staff applicant
  cookies().set("session", "");

  redirect(`/auth/${user}`);
};
