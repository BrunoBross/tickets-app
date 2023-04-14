import { z } from "zod";
import { verifyCpf } from "./utils";

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: "O nome é obrigatório" })
      .min(1, { message: "O nome é obrigatório" }),
    surname: z
      .string({ required_error: "O sobrenome é obrigatório" })
      .min(1, { message: "O sobrenome é obrigatório" }),
    birthDate: z.date({ required_error: "A data de nascimento é obrigatória" }),
    email: z
      .string({ required_error: "O e-mail é obrigatório" })
      .min(1, { message: "O e-mail é obrigatório" })
      .email({ message: "E-mail inválido" })
      .toLowerCase(),
    confirmEmail: z
      .string({ required_error: "A confirmação de e-mail é obrigatória" })
      .min(1, { message: "A confirmação de e-mail é obrigatória" })
      .email({ message: "E-mail inválido" })
      .toLowerCase(),
    cpf: z
      .string({ required_error: "O CPF é obrigatório" })
      .min(1, { message: "O CPF é obrigatório" })
      .refine(verifyCpf, "CPF inválido"),
    zipCode: z
      .string({ required_error: "O CEP é obrigatório" })
      .min(1, { message: "O CEP é obrigatório" }),
    address: z
      .string({ required_error: "O endereço é obrigatório" })
      .min(1, { message: "O endereço é obrigatório" }),
    addressNumber: z
      .string({
        required_error: "O número do endereço é obrigatório",
      })
      .min(1, { message: "O número do endereço é obrigatório" }),
    password: z
      .string({ required_error: "A senha é obrigatória" })
      .min(1, { message: "A senha é obrigatória" })
      .min(8, { message: "A senha deve conter pelo menos 8 caracteres" }),
    confirmPassword: z
      .string({ required_error: "A confirmação de senha é obrigatória" })
      .min(1, { message: "A confirmação de senha é obrigatória" }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    path: ["confirmEmail"],
    message: "Os e-mails precisam ser iguais",
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais",
  });

export type RegisterType = z.infer<typeof registerSchema>;
