export default function FormatDate(date: Date) {
  const data = new Date(date);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const hora = String(data.getHours()).padStart(2, "0");
  const minuto = String(data.getMinutes()).padStart(2, "0");
  const segundo = String(data.getSeconds()).padStart(2, "0");

  const dataFormatada =
    dia + "/" + mes + "/" + ano + " às " + hora + ":" + minuto + ":" + segundo;

  return dataFormatada;
}
