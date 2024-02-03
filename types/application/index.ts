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

export type {
  ProgrammeLevelName,
  Origin,
  EducationLevelName,
  ApplicationStatusName,
  ApplicantNotification,
};
