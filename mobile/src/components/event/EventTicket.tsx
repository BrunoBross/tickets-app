import { Text, TouchableOpacity, View } from "react-native";
import { TicketLot } from "./EventCard";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import convertGenter from "../../utils/convertGender";
import formatPrice from "../../utils/formatPrice";

interface EventTicketProps {
  ticketLot: TicketLot;
  removeLastTicketCartByTicketType: (ticketType: TicketLot) => void;
  getTicketCartAmount: (ticketType: TicketLot) => number;
  handleAddTicketToCart: (ticketType: TicketLot) => void;
}

export default function EventTicket(props: EventTicketProps) {
  const {
    ticketLot,
    removeLastTicketCartByTicketType,
    getTicketCartAmount,
    handleAddTicketToCart,
  } = props;

  return (
    <View
      key={ticketLot.id}
      className="flex-row justify-between p-3 bg-zinc-900 rounded-md mb-2 border-l-[6px] border-violet-600"
    >
      <View className="justify-between">
        <Text className="text-violet-600 font-semibold text-2xl">
          {ticketLot.ticket_type.name}
        </Text>
        <Text className="text-white font-semibold text-lg">
          {convertGenter("OTHER")}
        </Text>
        <Text className="text-white font-semibold text-lg">
          {ticketLot.lot_number}º Lote
        </Text>
      </View>
      <View className="items-end justify-between">
        <View>
          <Text className="text-white font-semibold text-xl">
            {formatPrice(ticketLot.total_price)}
          </Text>
          <Text className="text-zinc-500 font-semibold text-xs">
            {formatPrice(ticketLot.tax)} de taxa
          </Text>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity
            activeOpacity={0.7}
            className="px-2 h-10 bg-violet-600 justify-center rounded-l-md"
            onPress={() => removeLastTicketCartByTicketType(ticketLot)}
          >
            <Feather name="minus" size={20} color={colors.white} />
          </TouchableOpacity>
          <View className="border-y-2 border-violet-600 h-10 w-10 items-center justify-center">
            <Text className="text-white font-semibold text-xl">
              {getTicketCartAmount(ticketLot)}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            className="px-2 h-10 bg-violet-600 justify-center rounded-r-md"
            onPress={() => handleAddTicketToCart(ticketLot)}
          >
            <Feather name="plus" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
