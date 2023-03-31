import { Text, TouchableOpacity, View } from "react-native";
import { TicketCartInterface } from "../contexts/CartContext";
import convertGenter, { GenderEnum } from "../utils/convertGender";

interface CartItemInterface {
  event: TicketCartInterface;
}

export default function CartItem(props: CartItemInterface) {
  const {
    event: { id, eventId, ticketType },
  } = props;

  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View className="flex border-2 flex-row bg-zinc-500 justify-between p-4 rounded-md">
        <Text className="text-white font-semibold text-base">
          {ticketType.name}
          {" • "}
          {convertGenter(
            GenderEnum[ticketType.gender as keyof typeof GenderEnum]
          )}
        </Text>
        <Text className="text-white font-semibold text-base">
          R${ticketType.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
