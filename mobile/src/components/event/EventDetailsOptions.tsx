import clsx from "clsx";
import { useEffect, useReducer, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { EventInterface, TicketType } from "./EventCard";
import uuid from "react-native-uuid";
import EventTicket from "./EventTicket";
import { useAuth } from "../../contexts/AuthContext";
import { TicketCartInterface, useCart } from "../../contexts/CartContext";
import ConfirmModal from "../modals/ConfirmModal";
import useApi from "../../lib/api";
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
  const { api } = useApi();
  const [state, dispatch] = useReducer(reducer, initialValues);
  const { addCartList, cartList, setCartList } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);

  useEffect(() => {
    const getTicketTypes = async () => {
      const result = await api.get(`ticket-type/${event.id}`);

      setTicketTypes(result.data);
    };

    getTicketTypes();
  }, []);

  const handleAddTicketToCart = (ticketType: TicketType) => {
    if (user) {
      const ticketCart: TicketCartInterface = {
        id: String(uuid.v4()),
        eventId: event.id,
        ticketType: ticketType,
      };
      addCartList(ticketCart);
    } else {
      setIsModalOpen(true);
    }
  };

  const removeLastTicketCartByTicketType = (ticketType: TicketType) => {
    const ticketIndex = cartList.findIndex(
      (ticket) => ticket.ticketType.id === ticketType.id
    );

    if (ticketIndex !== -1) {
      const newCartList = cartList.filter(
        (ticket, index) => index !== ticketIndex
      );
      setCartList(newCartList);
    }
  };

  const getTicketCartAmount = (ticketType: TicketType) => {
    return cartList.filter((ticket) => ticket.ticketType.id === ticketType.id)
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
          ticketTypes={ticketTypes}
          getTicketCartAmount={getTicketCartAmount}
          handleAddTicketToCart={handleAddTicketToCart}
          removeLastTicketCartByTicketType={removeLastTicketCartByTicketType}
        />
      )}
      {state.info && <EventDescription description={event.description} />}
    </View>
  );
}
