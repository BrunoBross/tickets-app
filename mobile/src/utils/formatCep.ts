export default function formatCep(cep: string) {
  const cepRegex = /^(\d{5})(\d{3})$/;
  return cep.replace(cepRegex, "$1-$2");
}
