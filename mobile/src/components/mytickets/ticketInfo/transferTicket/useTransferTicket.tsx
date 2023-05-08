import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TransferTicketType,
  transferTicketSchema,
} from "./transferTicketSchema";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import { TicketInterface } from "../TicketInfo";
import useApi from "../../../../lib/api";
import { UserInterface, useAuth } from "../../../../contexts/AuthContext";
import { useMyTickets } from "../../../../contexts/MyTicketsContext";

interface TransferTicketProps {
  ticket: TicketInterface;
}

export default function useTransferTicket(props: TransferTicketProps) {
  const { ticket } = props;
  const { api } = useApi();
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const { retrieveTickets } = useMyTickets();

  const toast = useToast();
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isConfirmTransferModalOpen, setIsConfirmTransferModalOpen] =
    useState(false);
  const [userTransfer, setUserTransfer] = useState<UserInterface | null>(null);

  const createTransferTicketForm = useForm<TransferTicketType>({
    resolver: zodResolver(transferTicketSchema),
  });

  const onSubmit = async (data: TransferTicketType) => {
    if (user?.cpf === data.cpf) {
      return toast.show("Você já possui esse ingresso", {
        type: "danger",
      });
    }
    await api
      .get(`/user/findByCpf/${data.cpf}`)
      .then((response) => {
        setUserTransfer(response.data);
        setIsConfirmTransferModalOpen(true);
      })
      .catch((error) => {
        return toast.show("Usuário não encontrado", {
          type: "danger",
        });
      });
  };

  const handleTransferTicket = async () => {
    ticket &&
      (await api
        .patch("/ticket/transfer", {
          ticketId: ticket.id,
          newUserId: userTransfer!!.id,
        })
        .then(() => {
          toast.show("Ingresso transferido com sucesso", {
            type: "success",
          });
          retrieveTickets();
          setIsConfirmTransferModalOpen(false);
          setIsTransferModalOpen(false);
          navigate("myTickets");
        })
        .catch((error) => {
          console.log(error);
        }));
  };

  return {
    createTransferTicketForm,
    onSubmit,
    userTransfer,
    handleTransferTicket,
    isConfirmTransferModalOpen,
    isTransferModalOpen,
    setIsConfirmTransferModalOpen,
    setIsTransferModalOpen,
  };
}
