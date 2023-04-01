import { Text, TouchableOpacity, View } from "react-native";
import { TicketCartInterface } from "../contexts/CartContext";
import convertGenter from "../utils/convertGender";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

interface CartItemInterface {
  event: TicketCartInterface;
}

export default function CartItem(props: CartItemInterface) {
  const {
    event: { id, eventId, ticketType },
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="flex flex-row bg-violet-600 justify-between p-4 rounded-md mt-2"
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

      <Text className="text-white font-semibold text-base">
        R${ticketType.price}
      </Text>
    </TouchableOpacity>
  );
}
