import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EventCard from "../../../components/EventCard";
import Loading from "../../../components/Loading";
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
      <VStack alignItems="flex-start" spacing="2rem" maxH="100%">
        <HStack justify="space-between" w="100%">
          <Heading size="lg">Todos Eventos</Heading>
        </HStack>

        <Box
          gap="1rem"
          flexWrap="wrap"
          display="flex"
          overflowY="auto"
          maxH="100%"
          px="0.5rem"
        >
          {eventList ? (
            eventList.map((event) => {
              return <EventCard key={event.id} event={event} />;
            })
          ) : (
            <Loading />
          )}
        </Box>
      </VStack>
    </>
  );
}
