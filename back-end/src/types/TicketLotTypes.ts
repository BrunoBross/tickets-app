import { z } from "zod";

export const createTicketLotBody = z.object({
  amount_available: z.number(),
  lot_number: z.number(),
  price: z.number(),
  ticket_type_id: z.string(),
});

export type CreateTicketLotBodyInterface = z.infer<typeof createTicketLotBody>;
