import { z } from "zod";

export const createUserBody = z.object({
  name: z.string().nonempty(),
  surname: z.string().nonempty(),
  email: z.string().nonempty(),
  cpf: z.string().nonempty(),
  birth: z.coerce.date(),
  password: z.string().nonempty(),
});

export type CreateUserBodyInterface = z.infer<typeof createUserBody>;
