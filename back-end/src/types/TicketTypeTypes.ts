import { z } from "zod";

export const createTicketTypeBody = z.object({
  price: z.number(),
  name: z.string(),
  lot: z.number(),
  amount: z.number(),
});

export type CreateTicketTypeBodyInterface = z.infer<
  typeof createTicketTypeBody
>;