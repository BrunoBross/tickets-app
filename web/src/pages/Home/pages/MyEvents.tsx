import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  InputGroup,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Plus } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import DefaultModal from "../../../components/DefaultModal";
import EventCard from "../../../components/EventCard";
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const retrieveEventList = async () => {
    await api.get(`/organizer/event/${organizer?.id}`).then((response) => {
      setEventList(response.data);
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    retrieveEventList();
  }, []);

  const onSubmit = async (data: any) => {
    const {
      name,
      location,
      attraction,
      description,
      date: oldDate,
      batch: oldBatch,
    } = data;

    const date = new Date(oldDate);
    const batch = parseInt(oldBatch, 10);

    await api
      .post(`/event/${organizer?.id}`, {
        name,
        location,
        attraction,
        description,
        date,
        batch,
      })
      .then(() => {
        toast({
          title: "Evento criado com sucesso",
          position: "bottom-right",
          isClosable: true,
          variant: "left-accent",
          status: "success",
        });
        handleCancelForm();
        retrieveEventList();
      })
      .catch((error) => {
        toast({
          title: `${error.response.data.error}`,
          position: "bottom-right",
          isClosable: true,
          variant: "left-accent",
          status: "error",
        });
      });
  };

  const handleCancelForm = () => {
    reset();
    onClose();
  };

  const CreateEventModalForm = () => {
    return (
      <VStack>
        <InputGroup>
          <Input
            pr="4.5rem"
            type="text"
            borderColor="blue.500"
            borderWidth="2px"
            size="lg"
            placeholder="Nome do Evento"
            {...register("name")}
          />
        </InputGroup>

        <InputGroup>
          <Input
            pr="4.5rem"
            type="text"
            borderColor="blue.500"
            borderWidth="2px"
            size="lg"
            placeholder="Endereço / Local"
            {...register("location")}
          />
        </InputGroup>

        <InputGroup>
          <Input
            pr="4.5rem"
            type="text"
            borderColor="blue.500"
            borderWidth="2px"
            size="lg"
            placeholder="Atração"
            {...register("attraction")}
          />
        </InputGroup>

        <InputGroup>
          <Input
            pr="4.5rem"
            type="text"
            borderColor="blue.500"
            borderWidth="2px"
            size="lg"
            placeholder="Descrição"
            {...register("description")}
          />
        </InputGroup>

        <InputGroup>
          <Input
            pr="4.5rem"
            type="datetime-local"
            borderColor="blue.500"
            borderWidth="2px"
            size="lg"
            placeholder="Data"
            {...register("date")}
          />
        </InputGroup>
        <InputGroup>
          <Input
            pr="4.5rem"
            type="number"
            borderColor="blue.500"
            borderWidth="2px"
            size="lg"
            placeholder="Lote Atual"
            {...register("batch")}
          />
        </InputGroup>
      </VStack>
    );
  };

  const CreateEventModalButtons = () => {
    return (
      <HStack gap="0.5rem">
        <Button onClick={handleCancelForm}>Cancelar</Button>
        <Button colorScheme="blue" onClick={handleSubmit(onSubmit)}>
          Solicitar
        </Button>
      </HStack>
    );
  };

  return (
    <>
      <DefaultModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={handleCancelForm}
        initialRef={initialRef}
        finalRef={finalRef}
        body={CreateEventModalForm()}
        footer={CreateEventModalButtons()}
        title="Cadastrar Novo Evento"
      />
      <VStack alignItems="flex-start" spacing="2rem" maxH="100%">
        <HStack justify="space-between" w="100%" h="3rem">
          <Heading size="lg">Meus Eventos</Heading>
          <Button
            colorScheme="blue"
            gap="0.5rem"
            variant="outline"
            onClick={onOpen}
          >
            <Plus size={20} weight="bold" /> <Text>Novo Evento</Text>
          </Button>
        </HStack>

        <Box
          flexWrap="wrap"
          display="flex"
          overflowY="auto"
          width="100%"
          maxH="100%"
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
      </VStack>
    </>
  );
}
