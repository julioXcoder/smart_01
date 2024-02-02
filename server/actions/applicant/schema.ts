import {
  Origin,
  EducationLevelName,
  ProgrammeLevelName,
} from "@/types/application";
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
}

type NewApplicantResponse = Response<string>;

type ApplicantDataResponse = Response<ApplicantData>;

export type {
  NewApplicant,
  NewApplicantResponse,
  ApplicantData,
  ApplicantDataResponse,
};
