import z from "zod";

import {
  EducationLevel,
  PaymentStatus,
  Origin,
  ApplicationStatus,
  ProgrammeLevel,
} from "@prisma/client";

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
  status: PaymentStatus;
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
  applicantHighestEducation: EducationLevel;
  applicantControlNumber: ApplicantControlNumber;
  status: ApplicationStatus;
}

export type {
  ProgrammeLevel,
  Origin,
  EducationLevel,
  ApplicantNotification,
  ApplicationDetails,
  ApplicationStatus,
  ApplicantProgram,
  ApplicantImageData,
  ApplicantEducationFileData,
  ApplicantAdditionalFileData,
  ApplicantControlNumber,
  PaymentStatus,
};
