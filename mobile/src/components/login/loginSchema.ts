import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "O e-mail é obrigatório" })
    .min(1, { message: "O e-mail é obrigatório" })
    .email({ message: "E-mail inválido" })
    .toLowerCase(),
  password: z
    .string({ required_error: "A senha é obrigatória" })
    .min(1, { message: "A senha é obrigatória" })
    .min(8, { message: "A senha deve conter pelo menos 8 caracteres" }),
});

export type LoginType = z.infer<typeof loginSchema>;
