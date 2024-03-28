import z from "zod";
// import { ProgrammeLevel, Origin, EducationLevel } from "@/types/application";
import {
  ProgrammeLevel,
  EducationLevel,
  ExaminationType,
} from "@prisma/client";
import { IconType } from "react-icons";
import { ReactNode } from "react";
import { StaticImageData } from "next/image";

interface Step {
  label: string;
  Icon: IconType;
  content: ReactNode;
  image?: StaticImageData;
}

// const applicationTypes: { label: string; value: ProgrammeLevel }[] = [
//   { label: "Certificate", value: "CERTIFICATE" },
//   { label: "Diploma", value: "DIPLOMA" },
//   { label: "Postgraduate Diploma", value: "BACHELOR" },
//   { label: "Masters", value: "MASTERS" },
//   { label: "phD", value: "PHD" },
// ];

const applicationTypes = Object.keys(ProgrammeLevel).map((key) => ({
  label: key.charAt(0) + key.slice(1).toLowerCase(),
  value: ProgrammeLevel[key as keyof typeof ProgrammeLevel],
}));

const applicantOrigins: { label: string; value: ExaminationType }[] = [
  { label: "Tanzania - NECTA", value: "NECTA" },
  { label: "NON NECTA - Foreign", value: "FOREIGN" },
  { label: "Tanzania NECTA before 1988", value: "NECTA1988" },
];

const certificateEducationLevels: {
  label: string;
  value: EducationLevel;
}[] = [
  { label: "Form IV", value: "FORM_IV" },
  { label: "Veta NVA III", value: "VETA_NVA_III" },
];

const diplomaEducationLevels: { label: string; value: EducationLevel }[] = [
  { label: "Form IV", value: "FORM_IV" },
  { label: "Veta NVA III", value: "VETA_NVA_III" },
  { label: "NTA Level 4", value: "NTA_LEVEL_IV" },
  { label: "Form VI", value: "FORM_VI" },
  { label: "NTA Level 5", value: "NTA_LEVEL_V" },
];

const postgraduateDiplomaEducationLevels: {
  label: string;
  value: EducationLevel;
}[] = [{ label: "Degree", value: "DEGREE" }];

const mastersEducationLevels: { label: string; value: EducationLevel }[] = [
  { label: "Degree", value: "DEGREE" },
  { label: "Postgraduate Diploma", value: "DIPLOMA" },
];

const phdEducationLevels: { label: string; value: EducationLevel }[] = [
  { label: "Masters", value: "MASTERS" },
];

const indexFormat = z.string().regex(/^[SP]\d{4}\/\d{4}\/\d{4}$/);

const FormSchema = z
  .object({
    username: z.string().min(1, { message: "username is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface NewApplicant {
  username: string;
  formIVIndex: string;
  password: string;
  latestAcademicYearId: string;
  origin: ExaminationType;
  applicationType: ProgrammeLevel;
  highestEducationLevel: EducationLevel;
}

export {
  applicationTypes,
  applicantOrigins,
  certificateEducationLevels,
  diplomaEducationLevels,
  postgraduateDiplomaEducationLevels,
  mastersEducationLevels,
  phdEducationLevels,
  indexFormat,
  FormSchema,
  ProgrammeLevel,
  EducationLevel,
  ExaminationType,
};

export type { Step, NewApplicant };
