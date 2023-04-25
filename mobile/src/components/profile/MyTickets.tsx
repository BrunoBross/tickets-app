import { useFocusEffect } from "@react-navigation/native";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useCallback, useState } from "react";
import colors from "tailwindcss/colors";
import useApi from "../../lib/api";
import { Feather } from "@expo/vector-icons";
import { ModalPageProps } from "../../screens/Profile";
import Container from "../Container";
import TicketInfo from "./TicketInfo";
import { TicketInterface } from "./Ticket";

export default function MyTickets(props: ModalPageProps) {
  const { setIsModalPageOpen } = props;
  const { user } = useAuth();
  const { api } = useApi();
  const [myTicketList, setMyTicketList] = useState<TicketInterface[] | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);

  const retrieveTickets = async () => {
    if (user) {
      const response = await api.get(`ticket/user/${user.id}`);
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

  if (!myTicketList) {
    return (
      <Container hasBack onBack={() => setIsModalPageOpen(false)}>
        <View className="flex-1 bg-background justify-center items-center">
          <ActivityIndicator size="large" color={colors.violet[600]} />
        </View>
      </Container>
    );
  }

  return (
    <Container hasBack onBack={() => setIsModalPageOpen(false)}>
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
