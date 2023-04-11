import { cpf as cpfValidator } from "cpf-cnpj-validator";

export const verifyCpf = (cpf: string) => {
  return cpfValidator.isValid(cpf);
};

export const formatCpf = (cpf: string) => {
  return cpf.replace(/\./g, "").replace("-", "");
};
