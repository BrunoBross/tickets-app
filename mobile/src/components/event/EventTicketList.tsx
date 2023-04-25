import { Text, View } from "react-native";
import { TicketType } from "./EventCard";
import EventTicket from "./EventTicket";

interface EventTicketListProps {
  ticketTypes: TicketType[];
  handleAddTicketToCart: (ticketType: TicketType) => void;
  getTicketCartAmount: (ticketType: TicketType) => number;
  removeLastTicketCartByTicketType: (ticketType: TicketType) => void;
}

export default function EventTicketList(props: EventTicketListProps) {
  const {
    ticketTypes,
    getTicketCartAmount,
    handleAddTicketToCart,
    removeLastTicketCartByTicketType,
  } = props;

  return (
    <View className="flex-1">
      {ticketTypes.length > 0 ? (
        ticketTypes.map((ticketType: TicketType) => (
          <View
            key={ticketType.id}
            className="flex p-3 bg-zinc-800 rounded-md mb-2"
          >
            <EventTicket
              ticketType={ticketType}
              getTicketCartAmount={getTicketCartAmount}
              handleAddTicketToCart={handleAddTicketToCart}
              removeLastTicketCartByTicketType={
                removeLastTicketCartByTicketType
              }
            />
          </View>
        ))
      ) : (
        <Text className="text-white font-semibold text-base">
          Nenhum tipo de ingresso a venda!
        </Text>
      )}
    </View>
  );
}
