import { ProgrammeLevel, ProgrammeType } from "@prisma/client";

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
  level: ProgrammeLevel;
  duration: number;
  type: ProgrammeType;
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

export type { Campus, Programme, ProgrammeType };
