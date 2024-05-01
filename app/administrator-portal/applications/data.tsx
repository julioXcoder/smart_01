import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "College name is required.",
  }),
  campusId: z.string({
    required_error: "Please select a campus.",
  }),
});

export { FormSchema };
