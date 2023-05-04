import { useLayoutEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { EventInterface } from "../components/event/EventCard";
import useApi from "../lib/api";
import colors from "tailwindcss/colors";
import EventList from "../components/event/EventList";
import Container from "../components/Container";
import FloatingButton from "../components/bottomBar/FloatingButton";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../contexts/CartContext";

export default function Home() {
  const { api } = useApi();
  const { navigate } = useNavigation();
  const { showCartButton } = useCart();
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

  return (
    <>
      <Container title="Eventos">
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
      </Container>
    </>
  );
}
