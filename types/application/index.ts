import z from "zod";

import { ProgrammeLevelName } from "../university";

type EducationLevelName =
  | "FORM_IV"
  | "FORM_VI"
  | "VETA_NVA_III"
  | "NTA_LEVEL_IV"
  | "NTA_LEVEL_V"
  | "DIPLOMA"
  | "DEGREE"
  | "MASTERS";

type Origin = "NECTA" | "FOREIGN" | "NECTA1988";

type ApplicationStatusName = "DRAFT" | "ACCEPTED" | "UNDER_REVIEW" | "REJECTED";

type PaymentStatusName = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";

interface ApplicantNotification {
  id: string; // Unique identifier for the notification
  title: string; // Title of the notification
  message: string; // The actual notification message
  read: boolean; // Whether the notification has been read
  timestamp: Date; // When the notification was created
}

interface ProgrammeDetails {
  name: string;
  language: string;
  level: ProgrammeLevelName;
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

interface ApplicantProfile {
  nida: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nationality: string;
  gender: string;
}

interface ApplicantContacts {
  phone: string;
  email: string | null;
  alternativeEmail: string | null;
  alternativePhoneNumber: string | null;
  streetAddress: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
}

interface ApplicantEmergencyContacts {
  fullName: string;
  phone: string;
  email: string | null;
  alternativeEmail: string | null;
  alternativePhoneNumber: string | null;
  streetAddress: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  relation: string;
}

interface ApplicationStatus {
  applicationType: string;
  applicationStatus: ApplicationStatusName;
  programmePriorities: ApplicantProgram[];
}

interface ApplicantImageData {
  imageUrl: string;
  key: string;
  name: string;
  size: number;
}

interface ApplicantEducationFileData {
  url: string;
  key: string;
  type: string;
  name: string;
  size: number;
}

interface ApplicantAdditionalFileData {
  id: string;
  url: string;
  key: string;
  type: string;
  name: string;
  size: number;
}

interface ApplicantControlNumber {
  applicantApplicationId: string;
  controlNumber: string;
  status: PaymentStatusName;
}

interface ApplicationDetails {
  applicantEducationBackground: ApplicantEducationBackground[];
  programmePriorities: ApplicantProgram[];
  applicantProfile: ApplicantProfile;
  applicantImageData: ApplicantImageData;
  applicantEducationFileData: ApplicantEducationFileData;
  applicantAdditionalFileData: ApplicantAdditionalFileData[];
  applicantContacts: ApplicantContacts;
  applicantEmergencyContacts: ApplicantEmergencyContacts;
  applicantHighestEducation: EducationLevelName;
  applicantControlNumber: ApplicantControlNumber;
  status: ApplicationStatusName;
}

export type {
  ProgrammeLevelName,
  Origin,
  EducationLevelName,
  ApplicationStatusName,
  ApplicantNotification,
  ApplicationDetails,
  ApplicationStatus,
  ApplicantProgram,
  ApplicantImageData,
  ApplicantEducationFileData,
  ApplicantAdditionalFileData,
  ApplicantControlNumber,
  PaymentStatusName,
};
