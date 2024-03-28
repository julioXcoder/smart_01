import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Campus name is required.",
  }),
  location: z.string().min(1, {
    message: "Campus location is required.",
  }),
  country: z.string().min(1, {
    message: "Campus country is required.",
  }),
});

export { FormSchema };
