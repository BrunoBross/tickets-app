import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "tailwindcss/colors";
import { EventInterface } from "./EventCard";
import formatDate from "../../utils/formatEventDate";
import { Feather } from "@expo/vector-icons";
import useApi from "../../lib/api";
import EventDetailsOptions from "./EventDetailsOptions";
import Container from "../Container";
import FloatingButton from "../bottomBar/FloatingButton";
import { useCart } from "../../contexts/CartContext";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ParamList } from "../../@types/navigation";

export default function EventDetails() {
  const {
    params: { eventId },
  } = useRoute<RouteProp<ParamList, "eventDetails">>();
  const { navigate } = useNavigation();
  const { cartList } = useCart();
  const { serverIp, api } = useApi();
  const [event, setEvent] = useState<EventInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const retrieveEvent = async () => {
    setIsLoading(true);
    const response = await api.get(`event/${eventId}`);
    setEvent(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    retrieveEvent();
  }, []);

  if (!event || isLoading) {
    return (
      <Container hasBack>
        <View className="flex-1 bg-background justify-center items-center">
          <ActivityIndicator size="large" color={colors.violet[600]} />
        </View>
      </Container>
    );
  }

  return (
    <>
      <Container hasBack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mb-32">
            <Image
              source={{
                uri: `${serverIp}uploads/logo/${event.file_name}`,
              }}
              className="w-full h-40 rounded-md"
            />

            <View className="flex pt-3 flex-row items-center justify-between">
              <View>
                <Text className="text-white text-4xl font-semibold">
                  {event.name}
                </Text>
                <Text className="text-white text-base font-semibold">
                  {formatDate(event.date)}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                className="p-5 rounded-md bg-violet-600"
                onPress={() => Linking.openURL(event.location_link)}
              >
                <Feather name="map-pin" size={24} color={colors.white} />
              </TouchableOpacity>
            </View>
            <EventDetailsOptions event={event} />
          </View>
        </ScrollView>
      </Container>
      {cartList.length > 0 && (
        <FloatingButton
          title="Ir para o carrinho"
          handler={() => navigate("cart")}
          modal
        />
      )}
    </>
  );
}
