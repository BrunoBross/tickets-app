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
      <Text className="text-white text-4xl font-extrabold tracking-widest">
        Procurar
      </Text>
      <TextInput
        selectionColor={colors.white}
        placeholderTextColor={colors.zinc[700]}
        onChangeText={searchEvent}
        placeholder="Nome do evento"
        className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md"
      />
      <ScrollView>
        {eventList &&
          eventList.length > 0 &&
          eventList.map((event) => {
            return <EventCard key={event.id} event={event} />;
          })}
      </ScrollView>
    </View>
  );
}
