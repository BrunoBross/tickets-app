import { cpf as cpfValidator } from "cpf-cnpj-validator";
import useApi from "../../lib/api";

export const verifyCpf = (cpf: string) => {
  return cpfValidator.isValid(cpf);
};

export const formatRemoveCpf = (cpf: string) => {
  return cpf.replace(/\./g, "").replace("-", "");
};
