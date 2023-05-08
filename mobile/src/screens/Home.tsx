import { useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { EventInterface } from "../components/event/EventCard";
import useApi from "../lib/api";
import EventList from "../components/event/EventList";
import Container from "../components/Container";
import { Skeleton } from "moti/skeleton";
import Animated, { FadeIn } from "react-native-reanimated";

export default function Home() {
  const { api } = useApi();
  const [eventList, setEventList] = useState<EventInterface[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const retrieveEventList = async () => {
    setIsLoading(true);
    const response = await api.get("event");
    setEventList(response.data);
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    retrieveEventList();
  }, []);

  if (isLoading) {
    return (
      <Container title="Eventos" refreshName="eventos">
        <View className="flex-1 bg-background">
          <View className="mb-4">
            <Skeleton colorMode={"dark"} width={"100%"} height={160} />
            <View className="pt-2">
              <Skeleton colorMode={"dark"} width={"100%"} height={24} />
            </View>
          </View>
          <View className="mb-4">
            <Skeleton colorMode={"dark"} width={"100%"} height={160} />
            <View className="pt-2">
              <Skeleton colorMode={"dark"} width={"100%"} height={24} />
            </View>
          </View>
        </View>
      </Container>
    );
  }

  return (
    <>
      <Container title="Eventos" refreshName="eventos">
        <View className="flex-1">
          <Animated.View key={"uniqueKey"} entering={FadeIn.duration(500)}>
            <EventList
              eventList={eventList}
              retrieveEventList={retrieveEventList}
            />
          </Animated.View>
        </View>
      </Container>
    </>
  );
}
