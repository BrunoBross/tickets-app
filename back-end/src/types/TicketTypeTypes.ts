import { z } from "zod";

export const createTicketTypeBody = z.object({
  name: z.string(),
  description: z.string(),
});

export type CreateTicketTypeBodyInterface = z.infer<
  typeof createTicketTypeBody
>;
