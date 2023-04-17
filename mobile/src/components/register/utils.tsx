import { cpf as cpfValidator } from "cpf-cnpj-validator";

export const verifyCpf = (cpf: string) => {
  return cpfValidator.isValid(cpf);
};

export const formatRemoveCpf = (cpf: string) => {
  return cpf.replace(/\./g, "").replace("-", "");
};
