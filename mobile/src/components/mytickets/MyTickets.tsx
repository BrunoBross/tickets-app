import { ScrollView, Text, View } from "react-native";
import colors from "tailwindcss/colors";
import Container from "../Container";
import TicketListItem from "../profile/TicketListItem";
import { Feather } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl } from "react-native-gesture-handler";
import Animated, { FadeIn } from "react-native-reanimated";
import MyTicketsSkeleton from "./MyTicketsSkeleton";
import { useMyTickets } from "../../contexts/MyTicketsContext";

export default function MyTickets() {
  const { isLoading, myTicketList, retrieveTickets } = useMyTickets();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    retrieveTickets();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    retrieveTickets();
  }, []);

  if (isLoading) {
    return <MyTicketsSkeleton />;
  }

  return (
    <Container hasBack refreshName="ingressos">
      <Animated.View key={"uniqueKey"} entering={FadeIn.duration(500)}>
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
            {myTicketList && myTicketList.length > 0 ? (
              myTicketList.map((ticket) => {
                return <TicketListItem key={ticket.id} ticket={ticket} />;
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
      </Animated.View>
    </Container>
  );
}
