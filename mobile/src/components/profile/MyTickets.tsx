import { useFocusEffect } from "@react-navigation/native";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import { useCallback, useState } from "react";
import colors from "tailwindcss/colors";
import useApi from "../../lib/api";
import { Feather } from "@expo/vector-icons";
import Container from "../Container";
import TicketInfo from "./TicketInfo";
import { TicketInterface } from "./Ticket";

export default function MyTickets() {
  const { user } = useAuth();
  const { api } = useApi();
  const [myTicketList, setMyTicketList] = useState<TicketInterface[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const retrieveTickets = async () => {
    setIsLoading(true);
    if (user) {
      const response = await api.get(`ticket/user/${user.id}`);
      setMyTicketList(response.data);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      retrieveTickets();
    }, [])
  );

  const RefreshButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        className="h-12 w-40 flex-row items-center justify-center border-2 border-violet-600 rounded-md"
        onPress={retrieveTickets}
      >
        <MaterialCommunityIcons
          name="reload"
          size={24}
          color={colors.violet[600]}
        />
        <Text className="text-white pl-2 text-base font-semibold">
          Recarregar
        </Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <Container hasBack>
        <View className="flex-1 bg-background justify-center items-center">
          <ActivityIndicator size="large" color={colors.violet[600]} />
        </View>
      </Container>
    );
  }

  return (
    <Container hasBack button={<RefreshButton />}>
      <View>
        <ScrollView showsVerticalScrollIndicator={false} className="h-full">
          <View className="flex-1 mb-32">
            {myTicketList && myTicketList.length > 0 ? (
              myTicketList.map((ticket) => {
                return <TicketInfo key={ticket.id} ticket={ticket} />;
              })
            ) : (
              <View className="flex-row gap-x-2">
                <Text className="text-white text-base font-semibold">
                  Você não possui nenhum ingresso
                </Text>
                <Feather name="frown" size={24} color={colors.white} />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </Container>
  );
}
