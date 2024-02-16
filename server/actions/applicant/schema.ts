import {
  Origin,
  EducationLevelName,
  ProgrammeLevelName,
  ApplicantProgram,
  ApplicantNotification,
  ApplicationDetails,
  ApplicationStatus,
  ApplicationStatusName,
} from "@/types/application";
import z from "zod";
import { FormSchema } from "@/app/applicant_portal/edit/data";
import { Programme } from "@/types/university";
import { Response } from "@/types/api";

export interface StudentInfo {
  CNO: string;
  SEX: string;
  AGGT: string;
  DIV: string;
  DETAILED_SUBJECTS: string;
  result: Record<string, string>; // Add the result property
}

export interface GetFormIVDataResponse {
  data: StudentInfo;
  error: string | null;
}

interface NewApplicant {
  username: string;
  formIVIndex: string;
  firstName: string;
  middleName: string;
  lastName: string;
  password: string;
  origin: Origin;
  applicationType: ProgrammeLevelName;
  highestEducationLevel: EducationLevelName;
}

interface ApplicantData {
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  imageUrl: string | null;
  applicationStatus: ApplicationStatusName;
  notifications: ApplicantNotification[];
}

interface ApplicantFormData {
  formData: z.infer<typeof FormSchema>;
  applicantProgrammes: ApplicantProgram[];
}

type GenericResponse = Response<string>;

type ApplicantDataResponse = Response<ApplicantData>;

type ApplicantProgrammesResponse = Response<Programme[]>;

type ApplicationStatusResponse = Response<ApplicationStatus>;

type ApplicationDetailsResponse = Response<ApplicationDetails>;

export type {
  NewApplicant,
  ApplicantData,
  GenericResponse,
  ApplicantFormData,
  ApplicantDataResponse,
  ApplicationStatusResponse,
  ApplicationDetailsResponse,
  ApplicantProgrammesResponse,
};
