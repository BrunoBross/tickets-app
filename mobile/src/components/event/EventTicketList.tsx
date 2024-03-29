import { Text, View } from "react-native";
import { TicketLot } from "./EventCard";
import EventTicket from "./EventTicket";
import EventTicketListSkeleton from "./EventTicketListSkeleton";

interface EventTicketListProps {
  ticketLots: TicketLot[] | null;
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

  if (!ticketLots) {
    return <EventTicketListSkeleton />;
  }

  return (
    <View className="flex-1 mb-32">
      {ticketLots && ticketLots.length > 0 ? (
        ticketLots.map((ticketLot: TicketLot) => (
          <EventTicket
            key={ticketLot.id}
            ticketLot={ticketLot}
            getTicketCartAmount={getTicketCartAmount}
            handleAddTicketToCart={handleAddTicketToCart}
            removeLastTicketCartByTicketType={removeLastTicketCartByTicketType}
          />
        ))
      ) : (
        <Text className="text-white font-semibold text-base">
          Não há lotes disponíveis para venda!
        </Text>
      )}
    </View>
  );
}
