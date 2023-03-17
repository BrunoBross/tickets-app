import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EventCard from "../../../components/EventCard/EventCard";
import EventList from "../../../components/EventList/EventList";
import Loading from "../../../components/Loading/Loading";
import { api } from "../../../lib/api";

export interface EventInterface {
  id: string;
  name: string;
  location: string;
  attraction: string;
  description: string;
  date: Date;
  batch: number;
  organizer_id: string;
}

export default function AllEvents() {
  const [eventList, setEventList] = useState<EventInterface[] | null>(null);

  const retrieveEventList = async () => {
    await api.get(`/event`).then((response) => {
      setEventList(response.data);
    });
  };

  useEffect(() => {
    retrieveEventList();
  }, []);

  return (
    <>
      <VStack alignItems="flex-start" spacing="2rem" h="100%">
        <HStack justify="space-between" w="100%" h="3rem">
          <Heading size="lg">Todos Eventos</Heading>
        </HStack>

        <EventList eventList={eventList} />
      </VStack>
    </>
  );
}
