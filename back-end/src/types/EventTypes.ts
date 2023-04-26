import { z } from "zod";

export const createEventBody = z.object({
  name: z.string(),
  location: z.string(),
  location_link: z.string(),
  attraction: z.string(),
  description: z.string(),
  date: z.coerce.date(),
});

export type CreateEventBodyInterface = z.infer<typeof createEventBody>;
