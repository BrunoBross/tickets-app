import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Plus } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { api } from "../../lib/api";
import { formatDate } from "../../utils/dateFormatter";
import DefaultModal from "../DefaultModal";

export interface EventInterface {
  id: string;
  name: string;
  location: string;
  attraction: string;
  description: string;
  date: Date;
  batch: number;
  organizer_id: string;
  file_name: string;
}

interface EventCardProps {
  event: EventInterface;
}

interface TicketTypeInterface {
  id: string;
  price: number;
  name: string;
  batch: number;
  gender: string;
  event_id: string;
}

export default function EventCard(props: EventCardProps) {
  const {
    event: { id, name, date, location, file_name },
  } = props;

  console.log(file_name);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const newDate = formatDate(date);
  const info = `${newDate} • ${location}`;

  const [ticketTypesList, setTicketTypesList] = useState<
    TicketTypeInterface[] | null
  >();
  const retrieveTicketTypes = async () => {
    await api.get(`/ticket-type/${id}`).then((response) => {
      setTicketTypesList(response.data);
    });
  };

  useEffect(() => {
    retrieveTicketTypes();
  }, []);

  const Details = () => {
    return (
      <Box w="100%">
        <Box>
          <VStack>
            <HStack w="100%" justifyContent="space-between">
              <Heading>Tipos de ingresso</Heading>
              <Button
                colorScheme="blue"
                gap="0.5rem"
                variant="outline"
                onClick={onOpen}
              >
                <Plus size={20} weight="bold" /> <Text>Adicionar Tipo</Text>
              </Button>
            </HStack>
            <VStack w="100%" pl="2rem" alignItems="flex-start">
              {ticketTypesList ? (
                ticketTypesList.map((type) => (
                  <Text key={type.id}>
                    Lote: {type.batch} - {type.name} - R$ {type.price} -{" "}
                    {type.gender}
                  </Text>
                ))
              ) : (
                <Text>Nenhum tipo de ingresso encontrado</Text>
              )}
            </VStack>
          </VStack>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <DefaultModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        initialRef={initialRef}
        finalRef={finalRef}
        title={name}
        body={Details()}
        footer={<h1>footer</h1>}
      />
      <Box
        display="flex"
        flexDir="column"
        flex="1"
        padding="1rem"
        gap="0.5rem"
        minWidth="15rem"
        maxWidth="20rem"
        height="16rem"
        borderRadius="1rem"
        className="event-card transition"
        onClick={onOpen}
      >
        <Image
          height="70%"
          objectFit="cover"
          src={`https://tickets-api.onrender.com/uploads/logo/${file_name}`}
          backgroundColor="gray"
          borderRadius="1rem"
        />

        <VStack display="flex" flex="1" alignItems="flex-start">
          <Heading size="lg">{name}</Heading>
          <Text>{info}</Text>
        </VStack>
      </Box>
    </>
  );
}
