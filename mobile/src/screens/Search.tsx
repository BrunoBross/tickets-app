import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import EventCard, { EventInterface } from "../components/event/EventCard";
import useApi from "../lib/api";
import Container from "../components/Container";
import colors from "tailwindcss/colors";
import { Feather } from "@expo/vector-icons";

export default function Search() {
  const { api } = useApi();
  const [eventList, setEventList] = useState<EventInterface[] | null>([]);
  const [eventSearchInput, setEventSearchInput] = useState("");

  const searchEvent = async (input: string) => {
    setEventSearchInput(input);
    const response = await api.get(`event/search/${input}`);
    setEventList(response.data);
  };

  return (
    <Container title="Procurar">
      <TextInput
        onChangeText={searchEvent}
        selectionColor={colors.green[600]}
        placeholderTextColor={colors.zinc[500]}
        className="flex-row h-14 p-3 mb-2 items-center justify-between text-white text-base bg-zinc-900 border-2 rounded-md border-zinc-800 focus:border-green-600"
        placeholder="Nome do evento"
      />
      {eventList && eventList.length > 0 ? (
        <ScrollView className="pt-1">
          {eventList.map((event) => {
            return <EventCard key={event.id} event={event} />;
          })}
        </ScrollView>
      ) : eventSearchInput ? (
        <Text className="text-white font-semibold text-base">
          Desculpe, não encontramos o evento "{eventSearchInput}"
        </Text>
      ) : (
        <View className="flex-row gap-x-2">
          <Text className="text-white font-semibold text-base">
            Procure eventos pelo nome
          </Text>
          <Feather name="search" size={24} color={colors.white} />
        </View>
      )}
    </Container>
  );
}
