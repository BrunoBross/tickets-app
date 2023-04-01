import clsx from "clsx";
import { useReducer } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TicketCartInterface, useCart } from "../contexts/CartContext";
import convertGenter, { GenderEnum } from "../utils/convertGender";
import { EventInterface, TicketType } from "./EventCard";
import uuid from "react-native-uuid";
import { useAuth } from "../contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

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
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialValues);
  const { event } = props;
  const { addCartList, cartList, setCartList } = useCart();

  const handleAddTicketToCart = (ticketType: TicketType) => {
    if (user) {
      const ticketCart: TicketCartInterface = {
        id: String(uuid.v4()),
        eventId: event.id,
        ticketType: ticketType,
      };
      addCartList(ticketCart);
    }
  };

  const removeLastTicketCartByTicketType = (ticketType: TicketType) => {
    const ticketIndex = cartList.findIndex(
      (ticket) =>
        ticket.ticketType.name === ticketType.name &&
        ticket.ticketType.gender === ticketType.gender
    );

    if (ticketIndex !== -1) {
      const newCartList = cartList.filter(
        (ticket, index) => index !== ticketIndex
      );
      setCartList(newCartList);
    }
  };

  const getTicketCartAmount = (ticketType: TicketType) => {
    return cartList.filter(
      (ticket) =>
        ticket.ticketType.name === ticketType.name &&
        ticket.ticketType.gender === ticketType.gender
    ).length;
  };

  return (
    <View className="flex pt-2">
      <View className="flex flex-row">
        <TouchableOpacity
          activeOpacity={0.9}
          className={clsx("flex-1 p-3 h-14 items-center rounded-tl-md", {
            ["bg-violet-600 border-b-2 border-white"]: state.tickets === true,
            ["bg-violet-950"]: state.tickets === false,
          })}
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
          activeOpacity={0.9}
          className={clsx("flex-1 p-3 h-14 items-center rounded-tr-md", {
            ["bg-violet-600 border-b-2 border-white"]: state.info === true,
            ["bg-violet-950"]: state.info === false,
          })}
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
      {state.tickets === true && (
        <View className="flex gap-2 pt-2">
          {event.TicketType.length > 0 ? (
            event.TicketType?.map((ticketType: TicketType) => {
              return (
                <View
                  key={ticketType.id}
                  className="flex p-3 bg-zinc-800 rounded-md gap-1"
                >
                  <View className="flex-row justify-between ">
                    <Text className="text-white font-semibold text-lg">
                      {ticketType.name}
                      {" • "}
                      {convertGenter(ticketType.gender)}
                    </Text>
                    <Text className="text-white font-semibold text-lg">
                      R${ticketType.price}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-white font-semibold text-base">
                      {ticketType.batch}º Lote
                    </Text>
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        activeOpacity={0.7}
                        className="bg-violet-600 px-2 h-10 justify-center rounded-l-md"
                        onPress={() =>
                          removeLastTicketCartByTicketType(ticketType)
                        }
                      >
                        <Feather name="minus" size={24} color={colors.white} />
                      </TouchableOpacity>
                      <View className="border-y-2 border-violet-600 h-10 w-10 items-center">
                        <Text className="text-white font-semibold text-2xl">
                          {getTicketCartAmount(ticketType)}
                        </Text>
                      </View>

                      <TouchableOpacity
                        activeOpacity={0.7}
                        className="bg-violet-600 px-2 h-10 justify-center rounded-r-md"
                        onPress={() => handleAddTicketToCart(ticketType)}
                      >
                        <Feather name="plus" size={24} color={colors.white} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <Text className="text-white font-semibold text-base">
              Nenhum tipo de ingresso a venda!
            </Text>
          )}
        </View>
      )}
      {state.info === true && (
        <View className="flex gap-1 pt-1">
          <Text className="text-white font-semibold text-base">
            {event.description}
          </Text>
        </View>
      )}
    </View>
  );
}
