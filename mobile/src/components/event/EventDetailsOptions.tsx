import { useReducer, useState } from "react";
import { View } from "react-native";
import { EventInterface, TicketLot, TicketType } from "./EventCard";
import uuid from "react-native-uuid";
import { useAuth } from "../../contexts/AuthContext";
import { TicketCartInterface, useCart } from "../../contexts/CartContext";
import ConfirmModal from "../modals/ConfirmModal";
import EventDescription from "./EventDescription";
import EventTicketList from "./EventTicketList";
import SectionButton from "./SectionButton";

interface EventDetailsOptions {
  event: EventInterface;
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "tickets":
      return {
        tickets: true,
        info: false,
      };
    case "info":
      return {
        tickets: false,
        info: true,
      };
    default:
      return state;
  }
};

const initialValues = {
  tickets: true,
  info: false,
};

export default function EventDetailsOptions(props: EventDetailsOptions) {
  const { event } = props;
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialValues);
  const { addCartList, cartList, setCartList } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTicketToCart = (ticketLot: TicketLot) => {
    if (user) {
      const ticketCart: TicketCartInterface = {
        id: String(uuid.v4()),
        eventId: event.id,
        ticket_lot: ticketLot,
      };
      addCartList(ticketCart);
    } else {
      setIsModalOpen(true);
    }
  };

  const removeLastTicketCartByTicketType = (ticketLot: TicketLot) => {
    const ticketIndex = cartList.findIndex(
      (ticket) => ticket.ticket_lot.id === ticketLot.id
    );

    if (ticketIndex !== -1) {
      const newCartList = cartList.filter(
        (ticket, index) => index !== ticketIndex
      );
      setCartList(newCartList);
    }
  };

  const getTicketCartAmount = (ticketLot: TicketLot) => {
    return cartList.filter((ticket) => ticket.ticket_lot.id === ticketLot.id)
      .length;
  };

  return (
    <View className="flex pt-2">
      <ConfirmModal
        isVisible={isModalOpen}
        setIsVisible={setIsModalOpen}
        title="Erro"
        message="Você precisa estar logado"
        confirmText="Confirmar"
        handler={() => setIsModalOpen(false)}
      />
      <View className="flex flex-row mb-2">
        <SectionButton
          title="Ingressos"
          state={state.tickets}
          handler={() => dispatch({ type: "tickets" })}
        />
        <SectionButton
          title="Descrição"
          state={state.info}
          handler={() => dispatch({ type: "info" })}
          right
        />
      </View>
      {state.tickets && (
        <EventTicketList
          ticketLots={event.ticket_lots}
          getTicketCartAmount={getTicketCartAmount}
          handleAddTicketToCart={handleAddTicketToCart}
          removeLastTicketCartByTicketType={removeLastTicketCartByTicketType}
        />
      )}
      {state.info && <EventDescription description={event.description} />}
    </View>
  );
}
