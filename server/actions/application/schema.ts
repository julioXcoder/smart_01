import {
  ApplicantProgram,
  ApplicationStatus,
  EducationLevel,
  Origin,
  ProgrammeLevel,
} from "@/types/application";

interface NewApplicant {
  username: string;
  formIVIndex: string;
  firstName: string;
  middleName: string;
  lastName: string;
  password: string;
  origin: Origin;
  applicationType: ProgrammeLevel;
  highestEducationLevel: EducationLevel;
}

interface ApplicantApplication {
  id: string;
  status: ApplicationStatus;
  academicYearName: string;
  createdAt: Date;
  end: Date;
  isExpired: boolean;
}

export type { ApplicantApplication, NewApplicant };
