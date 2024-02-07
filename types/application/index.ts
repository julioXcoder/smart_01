import z from "zod";

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

type ProgrammeLevelName =
  | "DIPLOMA"
  | "CERTIFICATE"
  | "BACHELOR"
  | "MASTERS"
  | "PHD";

type ApplicationStatusName = "DRAFT" | "ACCEPTED" | "UNDER_REVIEW" | "REJECTED";

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
  position: number;
  level: string;
  schoolName: string;
  startYear: string;
  endYear: string;
}

interface ApplicantProfile {
  applicantUsername: string;
  nida: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nationality: string;
  gender: string;
}

interface ApplicantContacts {
  applicantUsername: string;
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
  applicantUsername: string;
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

interface ApplicationDetails {
  applicantEducationBackground: ApplicantEducationBackground[];
  programmePriorities: ApplicantProgram[];
  applicantProfile: ApplicantProfile;
  applicantImageData: ApplicantImageData;
  applicantContacts: ApplicantContacts;
  applicantEmergencyContacts: ApplicantEmergencyContacts;
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
};
