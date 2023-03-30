import clsx from "clsx";
import { useReducer } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { EventInterface } from "./EventCard";

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
  const [state, dispatch] = useReducer(reducer, initialValues);
  const { event } = props;

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
        <View className="flex gap-1 pt-1">
          {event.TicketType.length > 0 ? (
            event.TicketType?.map((type) => {
              return (
                <View
                  key={type.id}
                  className="flex p-3 h-14 flex-row justify-between bg-zinc-500 rounded-sm"
                >
                  <Text className="text-white font-semibold text-base">
                    {type.name}
                  </Text>
                  <Text className="text-white font-semibold text-base">
                    R${type.price}
                  </Text>
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
