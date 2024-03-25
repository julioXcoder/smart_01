interface StudentInfo {
  CNO: string;
  SEX: string;
  AGGT: string;
  DIV: string;
  DETAILED_SUBJECTS: string;
  result: Record<string, string>; // Add the result property
}

interface GetFormIVDataResponse {
  data: StudentInfo;
  error: string | null;
}

export type { GetFormIVDataResponse, StudentInfo };
