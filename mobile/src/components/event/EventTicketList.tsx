import { Text, View } from "react-native";
import { TicketLot } from "./EventCard";
import EventTicket from "./EventTicket";

interface EventTicketListProps {
  ticketLots: TicketLot[];
  handleAddTicketToCart: (ticketType: TicketLot) => void;
  getTicketCartAmount: (ticketType: TicketLot) => number;
  removeLastTicketCartByTicketType: (ticketType: TicketLot) => void;
}

export default function EventTicketList(props: EventTicketListProps) {
  const {
    ticketLots,
    getTicketCartAmount,
    handleAddTicketToCart,
    removeLastTicketCartByTicketType,
  } = props;

  return (
    <View className="flex-1">
      {ticketLots.length > 0 ? (
        ticketLots.map((ticketLot: TicketLot) => (
          <View
            key={ticketLot.id}
            className="flex p-3 bg-zinc-800 rounded-md mb-2"
          >
            <EventTicket
              ticketLot={ticketLot}
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