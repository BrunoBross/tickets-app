import { Text, TouchableOpacity, View } from "react-native";
import { TicketCartInterface, useCart } from "../../contexts/CartContext";
import convertGenter from "../../utils/convertGender";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Feather } from "@expo/vector-icons";
import formatTotalPrice from "../../utils/formatTotalPrice";
import formatPrice from "../../utils/formatPrice";

interface CartItemInterface {
  event: TicketCartInterface;
}

export default function CartItem(props: CartItemInterface) {
  const {
    event: { id, ticketType },
  } = props;
  const { deleteTicket, cartTotalPrice } = useCart();

  return (
    <View className="flex flex-row justify-between mb-2 bg-zinc-900 rounded-r-md">
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-[4] border-l-[6px] border-violet-600 flex-row items-center justify-between p-4 rounded-md"
      >
        <View className="flex gap-x-2">
          <Text className="text-violet-600 font-semibold text-xl">
            {ticketType.name.toUpperCase()}
          </Text>
          <Text className="text-white font-semibold text-base">
            {convertGenter(ticketType.gender)}
          </Text>
        </View>

        <Text className="text-white font-semibold text-base pl-2">
          {formatTotalPrice(ticketType.price, ticketType.tax)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-1 rounded-r-md items-center justify-center"
        onPress={() => deleteTicket(id)}
      >
        <Feather name="x" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}
