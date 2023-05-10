import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import colors from "tailwindcss/colors";
import { TicketLot } from "./EventCard";
import formatDate from "../../utils/formatEventDate";
import { Feather } from "@expo/vector-icons";
import useApi from "../../lib/api";
import Container from "../Container";
import { TicketCartInterface, useCart } from "../../contexts/CartContext";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { ParamList } from "../../@types/navigation";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EventTicketList from "./EventTicketList";
import { useAuth } from "../../contexts/AuthContext";
import ConfirmModal from "../modals/ConfirmModal";
import { getScreenOptions, tabScreenOptions } from "./options";
import EventDescription from "./EventDescription";
import { TicketInterface } from "../mytickets/ticketInfo/TicketInfo";
import { RefreshControl } from "react-native-gesture-handler";

const Tab = createMaterialTopTabNavigator();

export default function EventDetails() {
  const {
    params: { event },
  } = useRoute<RouteProp<ParamList, "eventDetails">>();
  const { serverIp, api } = useApi();
  const { addCartList, cartList, setCartList } = useCart();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketLots, setTicketLots] = useState<
    TicketInterface["ticket_lot"][] | null
  >(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleGetTicketLots = async () => {
    const response = await api.get(`ticket-lot/${event.id}`);
    setTicketLots(response.data);
  };

  useEffect(() => {
    handleGetTicketLots();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await handleGetTicketLots();
    setRefreshing(false);
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

  const TopImage = () => {
    return (
      <View className="mb-2 bg-background">
        <View className="aspect-video border-2 border-white rounded-lg">
          <Image
            source={{
              uri: `${serverIp}uploads/logo/${event.file_name}`,
            }}
            className="flex-1 rounded-md"
          />
        </View>
      </View>
    );
  };

  const TicketList = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.white]}
            progressBackgroundColor={colors.violet[600]}
          />
        }
      >
        <EventTicketList
          ticketLots={ticketLots}
          refreshing={refreshing}
          getTicketCartAmount={getTicketCartAmount}
          handleAddTicketToCart={handleAddTicketToCart}
          removeLastTicketCartByTicketType={removeLastTicketCartByTicketType}
        />
      </ScrollView>
    );
  };

  const Details = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} className="h-full">
        <View className="flex-1 mt-2 mx-[2] p-3 rounded-md bg-zinc-900 mb-32">
          <View className="flex-row justify-between">
            <View className="flex-1">
              <Text className="text-violet-600 text-4xl font-semibold">
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
          <EventDescription description={event.description} />
        </View>
      </ScrollView>
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
        <TopImage />
        <Tab.Navigator
          tabBarPosition="top"
          screenOptions={{ ...tabScreenOptions }}
        >
          <Tab.Screen
            name="Detalhes"
            component={Details}
            options={getScreenOptions("Detalhes")}
          />
          <Tab.Screen
            name="Ingressos"
            component={TicketList}
            options={getScreenOptions("Ingressos")}
          />
        </Tab.Navigator>
      </Container>
    </>
  );
}
