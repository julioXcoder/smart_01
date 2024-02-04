import { ProgrammeTypes } from "@/server/actions/programmes/types";
import { ProgrammeLevelName } from "@/types/application";

function getProgrammeType(type: ProgrammeTypes): string {
  switch (type) {
    case ProgrammeTypes.FULL_TIME:
      return "Full Time";
    case ProgrammeTypes.PART_TIME:
      return "Part Time";
    default:
      return "";
  }
}

function getEducationLevel(level: ProgrammeLevelName): string {
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

function getLevelDisplayText(level: ProgrammeLevelName): string {
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
