import {
  Origin,
  EducationLevelName,
  ProgrammeLevelName,
  ApplicationStatusName,
  ApplicantNotification,
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

interface ProgrammeDetails {
  name: string;
  level: ProgrammeLevelName;
}

interface ApplicantProgram {
  programmeCode: string;
  priority: number;
  programmeDetails: ProgrammeDetails;
}

interface ApplicantEducationBackground {
  position: number;
  level: string;
  schoolName: string;
  startYear: string;
  endYear: string;
}

interface ApplicationStatus {
  applicationType: string;
  applicationStatus: ApplicationStatusName;
  programmePriorities: ApplicantProgram[];
}

type NewApplicantResponse = Response<string>;

type ApplicantDataResponse = Response<ApplicantData>;

type ApplicationStatusResponse = Response<ApplicationStatus>;

export type {
  NewApplicant,
  NewApplicantResponse,
  ApplicantData,
  ApplicantDataResponse,
  ApplicationStatusResponse,
};
