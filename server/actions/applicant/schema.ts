import {
  Origin,
  EducationLevelName,
  ProgrammeLevelName,
  ApplicationStatusName,
  ApplicantNotification,
  ApplicationDetails,
  ApplicationStatus,
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
  firstName: string;
  middleName: string;
  lastName: string;
  imageUrl: string | null;

  notifications: ApplicantNotification[];
}

type NewApplicantResponse = Response<string>;

type AddApplicantProgrammeResponse = Response<string>;

type DeleteApplicantProgrammeResponse = Response<string>;

type ApplicantDataResponse = Response<ApplicantData>;

type ApplicationStatusResponse = Response<ApplicationStatus>;

type ApplicationDetailsResponse = Response<ApplicationDetails>;

export type {
  NewApplicant,
  NewApplicantResponse,
  ApplicantData,
  ApplicantDataResponse,
  ApplicationStatusResponse,
  ApplicationDetailsResponse,
  AddApplicantProgrammeResponse,
  DeleteApplicantProgrammeResponse,
};
