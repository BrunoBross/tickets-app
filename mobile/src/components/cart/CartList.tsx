import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { Feather } from "@expo/vector-icons";
import CartItem from "./CartItem";
import { TicketCartInterface, useCart } from "../../contexts/CartContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import formatPrice from "../../utils/formatPrice";

interface CartListProps {
  cartList: TicketCartInterface[] | [];
}

export default function CartList(props: CartListProps) {
  const { cartList } = props;
  const { cartTotalTax } = useCart();
  const { navigate } = useNavigation();

  return (
    <View className="flex-1">
      {cartList.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false} className="h-full">
          <View className="flex-1 mb-44">
            {cartList.map((event) => {
              return <CartItem key={event.id} event={event} />;
            })}
            <Text className="text-zinc-400 font-semibold text-xs">
              Total de taxas {formatPrice(cartTotalTax)}
            </Text>
          </View>
        </ScrollView>
      ) : (
        <View>
          <View className="flex-row gap-2">
            <Text className="text-white text-base font-semibold">
              Seu carrinho está vazio
            </Text>
            <Feather name="frown" size={24} color={colors.white} />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            className="p-4 h-14 flex-row bg-violet-600 rounded-md mt-3"
            onPress={() => navigate("homePage")}
          >
            <MaterialCommunityIcons
              name="ticket-confirmation-outline"
              size={24}
              color={colors.white}
            />
            <Text className="text-white pl-2 text-base font-semibold">
              Comprar ingressos
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
