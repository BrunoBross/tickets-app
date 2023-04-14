import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { EventInterface } from "../components/event/EventCard";
import useApi from "../lib/api";
import colors from "tailwindcss/colors";
import EventList from "../components/event/EventList";

export default function Home() {
  const api = useApi();
  const [eventList, setEventList] = useState<EventInterface[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const retrieveEventList = async () => {
    setIsLoading(true);
    const response = await api.get("event");
    setEventList(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    retrieveEventList();
  }, []);

  return (
    <View className="flex-1 bg-background p-5 pb-0 gap-5">
      <View className="justify-center h-14">
        <Text className=" text-white text-4xl font-extrabold tracking-widest">
          Eventos
        </Text>
      </View>

      {isLoading ? (
        <View className="flex-1 w-full h-full items-center justify-center bg-background">
          <ActivityIndicator size="large" color={colors.violet[600]} />
        </View>
      ) : (
        <View className="flex-1">
          <EventList
            eventList={eventList}
            retrieveEventList={retrieveEventList}
          />
        </View>
      )}
    </View>
  );
}
