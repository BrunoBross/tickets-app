import { z } from "zod";
import { verifyCpf } from "../register/utils";

export const transferTicketSchema = z.object({
  cpf: z
    .string({ required_error: "O CPF é obrigatório" })
    .min(1, { message: "O CPF é obrigatório" })
    .refine(verifyCpf, "CPF inválido"),
});

export type TransferTicketType = z.infer<typeof transferTicketSchema>;
