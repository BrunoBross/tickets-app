import { Box } from "@chakra-ui/react";
import EventCard, { EventInterface } from "../EventCard/EventCard";
import Loading from "../Loading/Loading";
import styles from "./EventList.css";

interface EventListProps {
  eventList: EventInterface[] | null;
}

export default function EventList(props: EventListProps) {
  const { eventList } = props;
  return (
    <Box
      flexWrap="wrap"
      display="flex"
      overflowY="auto"
      w="100%"
      h="100%"
      px="0.5rem"
      overflow="hidden"
    >
      {eventList ? (
        eventList.map((event) => {
          return <EventCard key={event.id} event={event} />;
        })
      ) : (
        <Loading />
      )}
    </Box>
  );
}
