import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { EventInterface } from "../../components/EventCard";
import EventList from "../../components/EventList";
import { api } from "../../lib/api";

export default function Home() {
  const [eventList, setEventList] = useState<EventInterface[] | null>(null);

  const retrieveEventList = async () => {
    const response = await api.get("/event");
    setEventList(response.data);
  };

  useEffect(() => {
    retrieveEventList();
  }, []);

  return (
    <View className="flex-1 bg-background p-5 gap-5">
      <View className="justify-center h-10">
        <Text className=" text-white text-4xl font-extrabold tracking-widest">
          Eventos
        </Text>
      </View>

      <View className="flex-1">
        <EventList
          eventList={eventList}
          retrieveEventList={retrieveEventList}
        />
      </View>
    </View>
  );
}
