import { cpf as cpfValidator } from "cpf-cnpj-validator";

export const verifyCpf = (cpf: string) => {
  return cpfValidator.isValid(cpf);
};
