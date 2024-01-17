import {
  EducationLevel,
  ProgrammeTypes,
} from "@/server/actions/programmes/types";

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

function getEducationLevel(level: EducationLevel): string {
  switch (level) {
    case EducationLevel.DIPLOMA:
      return "Diploma in";
    case EducationLevel.CERTIFICATE:
      return "Certificate in";
    case EducationLevel.BACHELOR:
      return "Bachelor's degree in";
    case EducationLevel.MASTERS:
      return "Master's degree in";
    case EducationLevel.PHD:
      return "PhD in";
    default:
      return "";
  }
}

function getLevelDisplayText(level: EducationLevel): string {
  switch (level) {
    case EducationLevel.DIPLOMA:
      return "Diploma";
    case EducationLevel.CERTIFICATE:
      return "Certificate";
    case EducationLevel.BACHELOR:
      return "Bachelor";
    case EducationLevel.MASTERS:
      return "Masters";
    case EducationLevel.PHD:
      return "PhD";
    default:
      return "";
  }
}

export { getEducationLevel, getLevelDisplayText, getProgrammeType };
