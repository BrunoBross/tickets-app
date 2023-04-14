import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import EventCard, { EventInterface } from "../components/event/EventCard";
import useApi from "../lib/api";
import { Form } from "../components/form";
import { useForm } from "react-hook-form";

export default function Search() {
  const api = useApi();
  const [eventList, setEventList] = useState<EventInterface[] | null>([]);
  const [eventSearchInput, setEventSearchInput] = useState("");
  const { control } = useForm();

  const searchEvent = async (input: string) => {
    setEventSearchInput(input);
    const response = await api.get(`event/search/${input}`);
    setEventList(response.data);
  };

  return (
    <View className="flex-1 bg-background p-5 pb-0 gap-5">
      <View className="justify-center h-14">
        <Text className="text-white text-4xl font-extrabold tracking-widest">
          Procurar
        </Text>
      </View>
      <View>
        <Form.ControlledInput
          name="search"
          control={control}
          placeholder="Nome do evento"
          icon="search"
        />
        <View className="mt-3">
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
            <Text className="text-white font-semibold text-base">
              Procure eventos pelo nome
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
