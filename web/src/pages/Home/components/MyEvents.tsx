import { Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import { useAuth } from "../../../contexts/AuthContext";
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

export default function MyEvents() {
  const { organizer } = useAuth();
  const [eventList, setEventList] = useState<EventInterface[] | null>(null);

  useEffect(() => {
    const retrieveEventList = async () => {
      await api
        .get("/event", { params: { organizerId: organizer?.id } })
        .then((response) => {
          setEventList(response.data);
        });
    };

    retrieveEventList();
  }, []);

  return (
    <div>
      <Heading size="lg">Meus Eventos</Heading>
      {eventList ? (
        eventList.map((event) => {
          return (
            <>
              <Text key={event.id}>Nome: {event.name}</Text>
              <Text key={event.id}>Localizacao: {event.location}</Text>
            </>
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
}
