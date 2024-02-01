import z from "zod";
import {
  ProgrammeLevelName,
  Origin,
  EducationLevelName,
} from "@/types/application";

const applicationTypes: { label: string; value: ProgrammeLevelName }[] = [
  { label: "Certificate", value: ProgrammeLevelName.CERTIFICATE },
  { label: "Diploma", value: ProgrammeLevelName.DIPLOMA },
  { label: "Postgraduate Diploma", value: ProgrammeLevelName.BACHELOR },
  { label: "Masters", value: ProgrammeLevelName.MASTERS },
  { label: "phD", value: ProgrammeLevelName.PHD },
];

const applicantOrigins: { label: string; value: Origin }[] = [
  { label: "Tanzania - NECTA", value: Origin.NECTA },
  { label: "NON NECTA - Foreign", value: Origin.FOREIGN },
  { label: "Tanzania NECTA before 1988", value: Origin.NECTA1988 },
];

const certificateEducationLevels: {
  label: string;
  value: EducationLevelName;
}[] = [
  { label: "Form IV", value: EducationLevelName.FORM_IV },
  { label: "Veta NVA III", value: EducationLevelName.VETA_NVA_III },
];

const diplomaEducationLevels: { label: string; value: EducationLevelName }[] = [
  { label: "Form IV", value: EducationLevelName.FORM_IV },
  { label: "Veta NVA III", value: EducationLevelName.VETA_NVA_III },
  { label: "NTA Level 4", value: EducationLevelName.NTA_LEVEL_IV },
  { label: "Form VI", value: EducationLevelName.FORM_VI },
  { label: "NTA Level 5", value: EducationLevelName.NTA_LEVEL_V },
];

const postgraduateDiplomaEducationLevels: {
  label: string;
  value: EducationLevelName;
}[] = [{ label: "Degree", value: EducationLevelName.DEGREE }];

const mastersEducationLevels: { label: string; value: EducationLevelName }[] = [
  { label: "Degree", value: EducationLevelName.DEGREE },
  { label: "Postgraduate Diploma", value: EducationLevelName.DIPLOMA },
];

const phdEducationLevels: { label: string; value: EducationLevelName }[] = [
  { label: "Masters", value: EducationLevelName.MASTERS },
];

const indexFormat = z.string().regex(/^[SP]\d{4}\/\d{4}\/\d{4}$/);

const FormSchema = z
  .object({
    username: z.string().min(1, { message: "username is required" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    middleName: z.string().min(1, { message: "Middle name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
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

  export {applicationTypes,applicantOrigins,certificateEducationLevels,diplomaEducationLevels,postgraduateDiplomaEducationLevels,mastersEducationLevels,phdEducationLevels,indexFormat,FormSchema}