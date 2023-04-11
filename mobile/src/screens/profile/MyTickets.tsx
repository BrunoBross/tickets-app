import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import { useCallback, useState } from "react";
import { EventInterface, TicketType } from "../../components/EventCard";
import formatEventDate from "../../utils/formatEventDate";
import convertGenter from "../../utils/convertGender";
import colors from "tailwindcss/colors";
import useApi from "../../lib/api";

interface TicketListInterface {
  id: string;
  purchase_date: Date;
  event_id: string;
  ticket_type_id: string;
  event: EventInterface;
  ticket_type: TicketType;
}

export default function MyTickets() {
  const { navigate, goBack } = useNavigation();
  const { user } = useAuth();
  const api = useApi();
  const [myTicketList, setMyTicketList] = useState<TicketListInterface[] | []>(
    []
  );
  const [refreshing, setRefreshing] = useState(false);

  const retrieveTickets = async () => {
    if (user) {
      const response = await api.get(`/ticket/user/${user.id}`);
      setMyTicketList(response.data);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await retrieveTickets();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      retrieveTickets();
    }, [])
  );

  return (
    <View className="flex-1 bg-background p-5 gap-5">
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <Ionicons
          name="arrow-back-outline"
          size={40}
          color={colors.zinc[400]}
        />
      </TouchableOpacity>
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.white]}
              progressBackgroundColor={colors.violet[600]}
            />
          }
          showsVerticalScrollIndicator={false}
          className="h-full"
        >
          <View className="flex-1 mb-32">
            {myTicketList.length > 0 ? (
              myTicketList.map((ticket) => {
                return (
                  <TouchableOpacity
                    key={ticket.id}
                    activeOpacity={0.7}
                    className="mb-8"
                    onPress={() => navigate("ticket", { ticketId: ticket.id })}
                  >
                    <View className="flex-1 flex-row items-center">
                      <View className="h-full w-1 bg-violet-600 mr-4"></View>
                      <View>
                        <Text className="text-violet-600  text-lg font-bold">
                          NÃO UTILIZADO
                        </Text>
                        <Text className="text-white text-lg font-semibold">
                          {ticket.event.name} - {ticket.event.attraction}
                        </Text>
                        <Text className="text-white text-lg font-semibold">
                          {ticket.ticket_type.name} -{" "}
                          {convertGenter(ticket.ticket_type.gender)}
                        </Text>
                        <Text className="text-white text-lg font-semibold">
                          {formatEventDate(ticket.event.date)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text className="text-white text-base font-semibold">
                Você não possui nenhum ingresso!
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}