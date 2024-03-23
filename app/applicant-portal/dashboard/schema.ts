import z from "zod";

import {
  EducationLevel,
  PaymentStatus,
  Origin,
  ApplicationStatus,
  ProgrammeLevel,
  ApplicantImageData,
  ApplicantEducationFileData,
  ApplicantAdditionalFileData,
  ApplicantDetails,
} from "@prisma/client";

interface ProgrammeDetails {
  name: string;
  language: string;
  level: ProgrammeLevel;
}

interface ApplicantProgram {
  id: string;
  programmeCode: string;
  priority: number;
  programmeDetails: ProgrammeDetails;
}

interface ApplicantEducationBackground {
  _id: string;
  position: number;
  level: string;
  schoolName: string;
  startYear: string;
  endYear: string;
}

interface ApplicationDetails {
  applicantEducationBackground: ApplicantEducationBackground[];
  programmePriorities: ApplicantProgram[];
  applicantDetails: ApplicantDetails;
  applicantImageData: ApplicantImageData;
  applicantEducationFileData: ApplicantEducationFileData;
}
