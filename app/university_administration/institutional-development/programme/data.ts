import { z } from "zod";
import { ProgrammeLevel, ProgrammeType } from "@prisma/client";

const programmeLevelList = Object.keys(ProgrammeLevel).map((key) => ({
  label: key.charAt(0) + key.slice(1).toLowerCase(),
  value: ProgrammeLevel[key as keyof typeof ProgrammeLevel],
}));

const programmeTypeList = Object.keys(ProgrammeType).map((key) => ({
  label: key
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" "),
  value: ProgrammeType[key as keyof typeof ProgrammeType],
}));

const FormSchema = z.object({
  code: z.string().min(1, {
    message: "Programme code is required.",
  }),
  name: z.string().min(1, {
    message: "Programme name is required.",
  }),
  level: z.nativeEnum(ProgrammeLevel),
  type: z.nativeEnum(ProgrammeType),
  language: z.string().min(1, {
    message: "Programme language is required.",
  }),
  department: z.string({
    required_error: "Please select a programme department.",
  }),
  duration: z
    .number()
    .min(1, "Duration should be more than one year")
    .max(5, "Duration should be less than 5 years"),
  tuitionFee: z.number().min(0, "Tuition fee should be a positive number"),
  availability: z.boolean(),
  qualification: z.string().min(1, {
    message: "Programme qualification is required.",
  }),
});

export { FormSchema, programmeTypeList, programmeLevelList };
