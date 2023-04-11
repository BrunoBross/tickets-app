export default function formatTotalPrice(price: number, tax: number) {
  const totalPrice = price + tax;
  return totalPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
