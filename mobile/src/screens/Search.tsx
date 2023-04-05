import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import colors from "tailwindcss/colors";
import EventCard, { EventInterface } from "../components/EventCard";
import { api } from "../lib/api";

export default function Search() {
  const [eventList, setEventList] = useState<EventInterface[] | null>(null);

  const searchEvent = async (input: string) => {
    const response = await api.get(`/event/search/${input}`);
    setEventList(response.data);
  };

  return (
    <View className="flex-1 bg-background p-5 gap-5">
      <View className="justify-center h-10">
        <Text className="text-white text-4xl font-extrabold tracking-widest">
          Procurar
        </Text>
      </View>

      <TextInput
        selectionColor={colors.white}
        placeholderTextColor={colors.zinc[500]}
        onChangeText={searchEvent}
        placeholder="Nome do evento"
        className="h-14 p-3 text-base text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
      />
      <ScrollView>
        {eventList ? (
          eventList.length > 0 &&
          eventList.map((event) => {
            return <EventCard key={event.id} event={event} />;
          })
        ) : (
          <Text className="text-white font-semibold text-base">
            Procure por eventos pelo nome
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
