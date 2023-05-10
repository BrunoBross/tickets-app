import { RefreshControl, ScrollView, Text, View } from "react-native";
import EventCard, { EventInterface } from "./EventCard";
import { useCallback, useState } from "react";
import colors from "tailwindcss/colors";
import { Feather } from "@expo/vector-icons";

interface EventListProps {
  eventList: EventInterface[] | null;
  retrieveEventList: () => Promise<void>;
}

export default function EventList(props: EventListProps) {
  const { eventList, retrieveEventList } = props;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await retrieveEventList();
    setRefreshing(false);
  }, []);

  return (
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
        {eventList && eventList.length > 0 ? (
          eventList.map((event) => {
            return <EventCard key={event.id} event={event} />;
          })
        ) : (
          <View className="flex-row gap-x-2">
            <Text className="text-white text-base font-semibold">
              Nenhum evento disponível
            </Text>
            <Feather name="frown" size={24} color={colors.white} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
