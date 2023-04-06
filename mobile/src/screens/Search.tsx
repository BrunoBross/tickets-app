import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import EventCard, { EventInterface } from "../components/EventCard";
import { api } from "../lib/api";
import InputText from "../components/form/InputText";

export default function Search() {
  const [eventList, setEventList] = useState<EventInterface[] | null>([]);
  const [eventSearchInput, setEventSearchInput] = useState("");

  const searchEvent = async (input: string) => {
    setEventSearchInput(input);
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
      <View>
        <InputText onChangeText={searchEvent} placeholder="Nome do evento" />
      </View>
      <ScrollView>
        {eventList && eventList.length > 0 ? (
          eventList.map((event) => {
            return <EventCard key={event.id} event={event} />;
          })
        ) : eventSearchInput ? (
          <Text className="text-white font-semibold text-base">
            Desculpe, não encontramos o evento "{eventSearchInput}"
          </Text>
        ) : (
          <Text className="text-white font-semibold text-base">
            Procure por eventos pelo nome
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
