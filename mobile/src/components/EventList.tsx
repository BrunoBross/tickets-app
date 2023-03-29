import { RefreshControl, ScrollView, Text } from "react-native";
import EventCard, { EventInterface } from "./EventCard";

interface EventListProps {
  eventList: EventInterface[] | null;
  refreshing: boolean;
  onRefresh: () => void;
}

export default function EventList(props: EventListProps) {
  const { eventList, refreshing, onRefresh } = props;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      {eventList && eventList.length > 0 ? (
        eventList.map((event) => {
          return <EventCard key={event.id} event={event} />;
        })
      ) : (
        <Text className="text-white text-xl">Nenhum evento disponível ;(</Text>
      )}
    </ScrollView>
  );
}
