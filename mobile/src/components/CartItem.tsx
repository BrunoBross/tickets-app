import { Text, TouchableOpacity, View } from "react-native";
import { TicketCartInterface, useCart } from "../contexts/CartContext";
import convertGenter from "../utils/convertGender";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Feather } from "@expo/vector-icons";

interface CartItemInterface {
  event: TicketCartInterface;
}

export default function CartItem(props: CartItemInterface) {
  const {
    event: { id, ticketType },
  } = props;
  const { deleteTicket } = useCart();

  return (
    <View className="flex flex-row justify-between mb-2">
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-[4] bg-violet-600 flex-row p-4 rounded-l-md"
      >
        <View className="flex-row gap-x-2">
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={24}
            color={colors.white}
          />
          <Text className="text-white font-semibold text-base">
            {ticketType.name}
            {" • "}
            {convertGenter(ticketType.gender)}
          </Text>
        </View>

        <Text className="text-white font-semibold text-base pl-2">
          R${ticketType.price}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-1 bg-violet-600 rounded-r-md items-center justify-center"
        onPress={() => deleteTicket(id)}
      >
        <Feather name="x" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}
