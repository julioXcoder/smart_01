import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Department name is required.",
  }),
  collegeId: z.string({
    required_error: "Please select a college.",
  }),
});

export { FormSchema };
