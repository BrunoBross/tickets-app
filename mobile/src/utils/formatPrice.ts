export default function formatPrice(totalPrice: number) {
  return totalPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
