import { Text, TouchableOpacity, View } from "react-native";
import { TicketCartInterface, useCart } from "../../contexts/CartContext";
import convertGenter from "../../utils/convertGender";
import colors from "tailwindcss/colors";
import { Feather } from "@expo/vector-icons";
import formatPrice from "../../utils/formatPrice";

interface CartItemInterface {
  event: TicketCartInterface;
}

export default function CartItem(props: CartItemInterface) {
  const {
    event: { id, ticket_lot },
  } = props;
  const { deleteTicket } = useCart();

  return (
    <View className="flex flex-row justify-between mb-2 bg-zinc-900 rounded-r-md">
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-[4] border-l-[6px] border-violet-600 flex-row items-center justify-between p-4 rounded-md"
      >
        <View className="flex gap-x-2">
          <Text className="text-violet-600 font-semibold text-xl">
            {ticket_lot.event.name.toUpperCase()}
          </Text>
          <Text className="text-white font-semibold text-base">
            {ticket_lot.ticket_type.name}
          </Text>
          <Text className="text-white font-semibold text-base">
            {convertGenter("OTHER")}
          </Text>
        </View>

        <Text className="text-white font-semibold text-base pl-2">
          {formatPrice(ticket_lot.total_price)}
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
