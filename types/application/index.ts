import z from "zod";

import {
  EducationLevel,
  PaymentStatus,
  Origin,
  ApplicationStatus,
  ProgrammeLevel,
  ApplicantProfile,
  ApplicantImageData,
  ApplicantEducationFileData,
  ApplicantContacts,
  ApplicantEmergencyContacts,
  ApplicationPayment,
  ApplicantAdditionalFileData,
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
  applicantControlNumber: ApplicationPayment;
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
  ApplicationPayment,
  PaymentStatus,
};
