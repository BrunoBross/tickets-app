export default function formatDate(date: Date) {
  const weekdays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  const newDate = new Date(date);
  const dayOfWeek = weekdays[newDate.getDay()];
  const dayOfMonth = newDate.getDate();
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  return `${dayOfWeek} - ${dayOfMonth}/${month}`;
}
