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
      <View className="flex flex-row">
        <TouchableOpacity
          activeOpacity={1}
          className={clsx(
            "flex-1 p-3 h-14 bg-violet-600 items-center rounded-tl-md",
            {
              ["border-b-2 border-white"]: state.tickets === true,
              ["opacity-50"]: state.tickets === false,
            }
          )}
          onPress={() => dispatch({ type: "tickets" })}
        >
          <Text
            className={clsx("text-xl font-semibold", {
              ["text-white"]: state.tickets === true,
              ["text-zinc-400"]: state.tickets === false,
            })}
          >
            Ingressos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          className={clsx(
            "flex-1 p-3 h-14 bg-violet-600 items-center rounded-tr-md",
            {
              ["border-b-2 border-white"]: state.info === true,
              ["opacity-50"]: state.info === false,
            }
          )}
          onPress={() => dispatch({ type: "info" })}
        >
          <Text
            className={clsx("text-xl font-semibold", {
              ["text-white"]: state.info === true,
              ["text-zinc-400"]: state.info === false,
            })}
          >
            Descrição
          </Text>
        </TouchableOpacity>
      </View>
      {state.tickets && (
        <View className="flex mt-2">
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
      )}
      {state.info && (
        <View className="flex mt-2">
          <View className="flex p-3 bg-zinc-800 rounded-md">
            <Text className="text-white font-semibold text-lg">
              {event.description}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
