import { useNavigation } from "@react-navigation/native";
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { EventInterface } from "../components/EventCard";
import { api } from "../lib/api";
import formatEventDate from "../utils/formatEventDate";

interface TicketListInterface {
  id: string;
  purchase_date: Date;
  event_id: string;
  ticket_type_id: string;
  event: EventInterface;
}

export default function MyTickets() {
  const { navigate, goBack } = useNavigation();
  const { user } = useAuth();
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

  useEffect(() => {
    retrieveTickets();
  }, []);

  return (
    <View className="flex-1 bg-background p-5 gap-5">
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <Ionicons name="arrow-back-outline" size={40} color="#a1a1aa" />
      </TouchableOpacity>
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-32">
            {myTicketList.length > 0 ? (
              myTicketList.map((ticket) => {
                return (
                  <TouchableOpacity
                    key={ticket.id}
                    activeOpacity={0.7}
                    className="mb-4"
                    onPress={() => navigate("ticket", { ticketId: ticket.id })}
                  >
                    <Image
                      source={{
                        uri: `http://192.168.1.104:3001/uploads/logo/${ticket.event.file_name}`,
                      }}
                      className="w-full h-40 rounded-md"
                    />
                    <Text className="text-white text-lg font-semibold">
                      {ticket.event.name} - {formatEventDate(ticket.event.date)}
                    </Text>
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
