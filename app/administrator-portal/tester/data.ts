import { z } from "zod";

interface Programme {
  programmeId: string;
  programmeName: string;
}

interface ProgrammeMinimumRequirements extends Programme {
  minimumGPA: number;
}

interface ProgrammeMinimumStandards {
  programmeList: ProgrammeMinimumRequirements[];
}

const programmes: Programme[] = [
  { programmeId: "1", programmeName: "Programme 1" },
  { programmeId: "2", programmeName: "Programme 2" },
  { programmeId: "3", programmeName: "Programme 3" },
  { programmeId: "4", programmeName: "Programme 4" },
  { programmeId: "5", programmeName: "Programme 5" },
  { programmeId: "6", programmeName: "Programme 6" },
  { programmeId: "7", programmeName: "Programme 7" },
  { programmeId: "8", programmeName: "Programme 8" },
  { programmeId: "9", programmeName: "Programme 9" },
  { programmeId: "10", programmeName: "Programme 10" },
];

const ProgrammeSchema = z.object({
  programmeId: z.string(),
  programmeName: z.string(),
});

const ProgrammeMinimumRequirementsSchema = ProgrammeSchema.extend({
  minimumGPA: z
    .number()
    .min(1, "GPA must be at least 1")
    .max(5, "GPA cannot exceed 5"),
});

const uniqueString = "~~~";

export { uniqueString, programmes, ProgrammeMinimumRequirementsSchema };

export type { ProgrammeMinimumRequirements, Programme };
