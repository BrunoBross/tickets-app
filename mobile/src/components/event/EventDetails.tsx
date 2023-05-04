import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import colors from "tailwindcss/colors";
import { EventInterface, TicketLot } from "./EventCard";
import formatDate from "../../utils/formatEventDate";
import { Feather } from "@expo/vector-icons";
import useApi from "../../lib/api";
import Container from "../Container";
import { TicketCartInterface, useCart } from "../../contexts/CartContext";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ParamList } from "../../@types/navigation";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EventTicketList from "./EventTicketList";
import { useAuth } from "../../contexts/AuthContext";
import ConfirmModal from "../modals/ConfirmModal";
import { getScreenOptions, tabScreenOptions } from "./options";
import EventDescription from "./EventDescription";
import FloatingButton from "../bottomBar/FloatingButton";

const Tab = createMaterialTopTabNavigator();

export default function EventDetails() {
  const {
    params: { eventId },
  } = useRoute<RouteProp<ParamList, "eventDetails">>();
  const { navigate } = useNavigation();
  const { serverIp, api } = useApi();
  const [event, setEvent] = useState<EventInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addCartList, cartList, setCartList } = useCart();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const retrieveEvent = async () => {
    setIsLoading(true);
    const response = await api.get(`event/${eventId}`);
    setEvent(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    retrieveEvent();
  }, []);

  const handleAddTicketToCart = (ticketLot: TicketLot) => {
    if (user && event) {
      const ticketCart: TicketCartInterface = {
        id: String(uuid.v4()),
        eventId: event.id,
        ticket_lot: ticketLot,
      };
      addCartList(ticketCart);
    } else {
      setIsModalOpen(true);
    }
  };

  const removeLastTicketCartByTicketType = (ticketLot: TicketLot) => {
    const ticketIndex = cartList.findIndex(
      (ticket) => ticket.ticket_lot.id === ticketLot.id
    );

    if (ticketIndex !== -1) {
      const newCartList = cartList.filter(
        (ticket, index) => index !== ticketIndex
      );
      setCartList(newCartList);
    }
  };

  const getTicketCartAmount = (ticketLot: TicketLot) => {
    return cartList.filter((ticket) => ticket.ticket_lot.id === ticketLot.id)
      .length;
  };

  if (!event || isLoading) {
    return (
      <Container hasBack>
        <View className="flex-1 bg-background justify-center items-center">
          <ActivityIndicator size="large" color={colors.violet[600]} />
        </View>
      </Container>
    );
  }

  const Description = () => {
    return <EventDescription description={event.description} />;
  };

  const Details = () => {
    return (
      <View className="mt-3 mb-3 bg-background">
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
      </View>
    );
  };

  const Ticket = () => {
    return (
      <View className="flex-1 mt-3 mx-1 bg-background">
        <ScrollView showsVerticalScrollIndicator={false}>
          <EventTicketList
            ticketLots={event.ticket_lots}
            getTicketCartAmount={getTicketCartAmount}
            handleAddTicketToCart={handleAddTicketToCart}
            removeLastTicketCartByTicketType={removeLastTicketCartByTicketType}
          />
        </ScrollView>
      </View>
    );
  };

  return (
    <>
      <ConfirmModal
        isVisible={isModalOpen}
        setIsVisible={setIsModalOpen}
        title="Erro"
        message="Você precisa estar logado"
        confirmText="Confirmar"
        handler={() => setIsModalOpen(false)}
      />
      <Container hasBack>
        <Details />
        <Tab.Navigator
          tabBarPosition="top"
          screenOptions={{ ...tabScreenOptions }}
          keyboardDismissMode="none"
        >
          <Tab.Screen
            name="Ingressos"
            component={Ticket}
            options={getScreenOptions("Ingressos")}
          />
          <Tab.Screen
            name="Detalhes"
            component={Description}
            options={getScreenOptions("Detalhes")}
          />
        </Tab.Navigator>
      </Container>
    </>
  );
}
