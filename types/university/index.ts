type ProgrammeLevelName =
  | "DIPLOMA"
  | "CERTIFICATE"
  | "BACHELOR"
  | "MASTERS"
  | "PHD";

export enum ProgrammeTypes {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
}

type Campus = {
  id: string;
  name: string;
  location: string;
  shortHand: string;
  country: string;
};

type College = {
  id: string;
  name: string;
  campusId: string;
};

type Department = {
  id: string;
  name: string;
  collegeId: string;
};

type Programme = {
  code: string;
  name: string;
  level: ProgrammeLevelName;
  duration: number;
  type: ProgrammeTypes;
  language: string;
  departmentId: string;
  tuitionFee: number;
  applicationFee: number;
  qualification: string;
  applicationDeadline: string;
  department: Department;
  college: College;
  campus: Campus;
};

export type { Programme, Campus, ProgrammeLevelName };
