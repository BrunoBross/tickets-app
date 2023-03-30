import { Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { cartList, clearCartList } = useCart();
  return (
    <View className="flex-1 bg-background p-5 gap-5">
      <Text className="text-white text-4xl font-extrabold tracking-widest">
        Carrinho
      </Text>
      {cartList.length > 0 ? (
        cartList.map((tickets) => {
          return (
            <Text key={tickets.id} className="text-white text-xl">
              {tickets.ticketTypeId}
            </Text>
          );
        })
      ) : (
        <Text className="text-white text-xl">Seu carrinho está vazio</Text>
      )}
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex border-2 bg-violet-600 p-4 rounded-md"
        >
          <Text className=" text-white text-base font-semibold">
            Comprar Ingressos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex border-2 bg-zinc-700 p-4 rounded-md"
          onPress={clearCartList}
        >
          <Text className=" text-white text-base font-semibold">
            Esvaziar Carrinho
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
