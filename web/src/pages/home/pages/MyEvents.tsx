import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  InputGroup,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Plus } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import DefaultModal from "../../../components/DefaultModal";
import DragNDrop from "../../../components/DragNDrop/DragNDrop";
import EventCard from "../../../components/EventCard/EventCard";
import EventInput from "../../../components/EventInput/EventInput";
import EventList from "../../../components/EventList/EventList";
import Loading from "../../../components/Loading/Loading";
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

  const hasNonEmptyFieldValue = (
    data: Record<string, string | number>
  ): Boolean => {
    for (let key in data) {
      if (data[key] !== "") {
        return true;
      }
    }
    return false;
  };

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
      <Box>
        <HStack display="flex" gap="1rem" w="100%" spacing={0}>
          <VStack
            display="flex"
            w="50%"
            h="17rem"
            spacing={0}
            justifyContent="flex-start"
          >
            <EventInput
              inputName="Nome"
              registerName="name"
              placeholder="Nome do evento"
              register={register}
            />

            <EventInput
              inputName="Endereço"
              registerName="location"
              placeholder="Endereço do evento"
              register={register}
            />

            <EventInput
              inputName="Atração"
              registerName="attraction"
              placeholder="Atração do evento"
              register={register}
            />
          </VStack>

          <VStack
            display="flex"
            w="50%"
            h="17rem"
            spacing={0}
            justifyContent="flex-start"
          >
            <EventInput
              inputName="Data"
              registerName="date"
              type="datetime-local"
              placeholder="Data do evento"
              register={register}
            />

            <EventInput
              inputName="Lote Atual"
              registerName="batch"
              type="number"
              placeholder="Lote atual do evento"
              register={register}
            />

            <InputGroup display="flex" flexDir="column" gap="0.5rem">
              <Heading
                display="flex"
                size="md"
                gap="0.5rem"
                alignItems="flex-start"
              >
                Logo Evento <span style={{ color: "red" }}>*</span>
              </Heading>
              <DragNDrop label="Arraste e solte a logo da festa aqui" />
            </InputGroup>
          </VStack>
        </HStack>

        <HStack>
          <InputGroup display="flex" flexDir="column" gap="0.5rem">
            <Heading
              display="flex"
              size="md"
              gap="0.5rem"
              alignItems="flex-start"
            >
              Descrição <span style={{ color: "red" }}>*</span>
            </Heading>
            <Textarea
              borderColor="blue.500"
              borderWidth="2px"
              size="lg"
              placeholder="Descrição"
              {...register("description")}
            />
          </InputGroup>
        </HStack>
      </Box>
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
      <VStack alignItems="flex-start" spacing="2rem" h="100%">
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

        <EventList eventList={eventList} />
      </VStack>
    </>
  );
}
