import { ProgrammeLevel } from "@/types/application";
import { ProgrammeType } from "@prisma/client";

function getProgrammeType(type: ProgrammeType): string {
  switch (type) {
    case "FULL_TIME":
      return "Full Time";
    case "PART_TIME":
      return "Part Time";
    default:
      return "";
  }
}

function getEducationLevel(level: ProgrammeLevel): string {
  switch (level) {
    case "DIPLOMA":
      return "Diploma in";
    case "CERTIFICATE":
      return "Certificate in";
    case "BACHELOR":
      return "Bachelor's degree in";
    case "MASTERS":
      return "Master's degree in";
    case "PHD":
      return "PhD in";
    default:
      return "";
  }
}

function getLevelDisplayText(level: ProgrammeLevel): string {
  switch (level) {
    case "DIPLOMA":
      return "Diploma";
    case "CERTIFICATE":
      return "Certificate";
    case "BACHELOR":
      return "Bachelor";
    case "MASTERS":
      return "Masters";
    case "PHD":
      return "PhD";
    default:
      return "";
  }
}

export { getEducationLevel, getLevelDisplayText, getProgrammeType };
