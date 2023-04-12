import { cpf as cpfValidator, cnpj as cnpjValidator } from "cpf-cnpj-validator";
import cepFinder from "cep-promise";
import emailRegex from "email-regex";

export const verifyCpf = (cpf: string) => {
  return cpfValidator.isValid(cpf);
};

export const verifyCnpj = (cnpj: string) => {
  return cnpjValidator.isValid(cnpj);
};

export const verifyGender = (gender: string) => {
  return (<any>Object).values(Gender).includes(gender);
};

export const verifyCep = async (cep: string) => {
  const isValid = await cepFinder(cep).catch(() => {
    return false;
  });
  return Boolean(isValid);
};

export const verifyEmail = (email: string) => {
  const isValid = email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return isValid;
};

export enum Gender {
  Male = "MALE",
  Female = "FEMALE",
  Other = "OTHER",
}
