export enum EducationLevel {
  DIPLOMA = "DIPLOMA",
  CERTIFICATE = "CERTIFICATE",
  BACHELOR = "BACHELOR",
  MASTERS = "MASTERS",
  PHD = "PHD",
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
  level: EducationLevel;
  duration: number;
  type: "FULL_TIME" | "PART_TIME";
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

type ProgrammeResponse = { data: Programme[] | null; error: string | null };

export type { ProgrammeResponse, Programme, Campus };
