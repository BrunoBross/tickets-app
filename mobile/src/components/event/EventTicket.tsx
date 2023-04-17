import { Text, TouchableOpacity, View } from "react-native";
import { TicketType } from "./EventCard";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import convertGenter from "../../utils/convertGender";
import formatPrice from "../../utils/formatPrice";
import formatTotalPrice from "../../utils/formatTotalPrice";

interface EventTicketProps {
  ticketType: TicketType;
  removeLastTicketCartByTicketType: (ticketType: TicketType) => void;
  getTicketCartAmount: (ticketType: TicketType) => number;
  handleAddTicketToCart: (ticketType: TicketType) => void;
  averageColor: string;
}

export default function EventTicket(props: EventTicketProps) {
  const {
    ticketType,
    removeLastTicketCartByTicketType,
    getTicketCartAmount,
    handleAddTicketToCart,
    averageColor,
  } = props;

  return (
    <View className="flex-row justify-between">
      <View>
        <Text className="text-white font-semibold text-2xl">
          {ticketType.name}
        </Text>
        <Text className="text-white font-semibold text-lg">
          {convertGenter(ticketType.gender)}
        </Text>
        <Text className="text-white font-semibold text-lg">
          {ticketType.batch}º Lote
        </Text>
        <Text className="text-zinc-400 font-semibold text-xs">
          {formatPrice(ticketType.price)} + {formatPrice(ticketType.tax)} de
          taxa
        </Text>
      </View>
      <View className="items-end justify-between">
        <Text className="text-white font-semibold text-xl">
          {formatTotalPrice(ticketType.price, ticketType.tax)}
        </Text>
        <View className="flex-row items-center">
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ backgroundColor: averageColor }}
            className="px-2 h-10 justify-center rounded-l-md"
            onPress={() => removeLastTicketCartByTicketType(ticketType)}
          >
            <Feather name="minus" size={20} color={colors.white} />
          </TouchableOpacity>
          <View
            style={{ borderColor: averageColor }}
            className="border-y-2 h-10 w-10 items-center justify-center"
          >
            <Text className="text-white font-semibold text-xl">
              {getTicketCartAmount(ticketType)}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{ backgroundColor: averageColor }}
            className="px-2 h-10 justify-center rounded-r-md"
            onPress={() => handleAddTicketToCart(ticketType)}
          >
            <Feather name="plus" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
