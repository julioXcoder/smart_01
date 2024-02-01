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
  firstName: string;
  middleName: string;
  lastName: string;
  formIVIndex: string;
  password: string;
  origin: Origin;
  applicationType: ProgrammeLevelName;
  highestEducationLevel: EducationLevelName;
}

type NewApplicantResponse = Response<String>;

export type { NewApplicant, NewApplicantResponse };
