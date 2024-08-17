import { z } from "zod";

export const formSchema = z.object({
  sources: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  category: z.string().optional(),
  date: z.date().optional(),
  author: z.string().optional(),
});
