import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { EventInterface, TicketType } from "../../components/event/EventCard";
import convertGenter from "../../utils/convertGender";
import colors from "tailwindcss/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ConfirmModal from "../../components/modals/ConfirmModal";
import MaskInput, { Masks } from "react-native-mask-input";
import clsx from "clsx";
import { verifyCpf, formatRemoveCpf } from "../../components/register/utils";
import { UserInterface } from "../../contexts/AuthContext";
import useApi from "../../lib/api";
import formatCpf from "../../utils/formatCpf";
import Container from "../Container";

interface Params {
  ticketId: string;
}

export interface TicketInterface {
  id: string;
  event_id: string;
  purchase_date: string;
  ticket_type: TicketType;
  ticket_type_id: string;
  event: EventInterface;
  user_id: string;
}

interface TicketProps {
  ticket: TicketInterface;
  setIsModalOpen: (state: boolean) => void;
}

export default function Ticket(props: TicketProps) {
  const { ticket, setIsModalOpen } = props;
  const { user } = useAuth();
  const { api } = useApi();

  const [isAskCpfModalOpen, setIsAskCpfModalOpen] = useState(false);
  const [isConfirmTransferModalOpen, setIsConfirmTransferModalOpen] =
    useState(false);
  const [transferError, setTransferError] = useState("");
  const [userTransfer, setUserTransfer] = useState<UserInterface | null>(null);
  const [cpfTransfer, setCpfTransfer] = useState("");

  const handleTicketTransfer = () => {
    setIsAskCpfModalOpen(true);
  };

  const requestUser = async (cpf: string) => {
    setCpfTransfer(cpf);

    await api
      .get(`/user/findByCpf/${cpf}`)
      .then((response) => {
        setTransferError("");
        setUserTransfer(response.data);
      })
      .catch(() => {});
  };

  const confirmAskTransfer = async () => {
    if (cpfTransfer.length < 14 || !verifyCpf(cpfTransfer)) {
      return setTransferError("CPF inválido");
    }

    if (formatRemoveCpf(cpfTransfer) === user?.cpf) {
      return setTransferError("Você não pode transferir para si mesmo");
    }

    if (!userTransfer) {
      return setTransferError("Usuário não encontrado");
    }

    setIsConfirmTransferModalOpen(true);
    setIsAskCpfModalOpen(false);
  };

  const confirmTransfer = async () => {
    await api
      .patch("/ticket/transfer", {
        ticketId: ticket.id,
        newUserId: userTransfer!!.id,
      })
      .then(() => {
        setIsAskCpfModalOpen(false);
        setIsConfirmTransferModalOpen(false);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancelAskTransfer = () => {
    setIsAskCpfModalOpen(false);
    setIsConfirmTransferModalOpen(false);
    setCpfTransfer("");
    setTransferError("");
    setUserTransfer(null);
  };

  const cancelConfirmTransfer = () => {
    setIsAskCpfModalOpen(true);
    setIsConfirmTransferModalOpen(false);
  };

  if (!ticket) {
    return (
      <View className="flex-1 bg-background p-5 pb-0 gap-5">
        <View className="justify-center h-14">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsModalOpen(false)}
          >
            <Ionicons
              name="arrow-back-outline"
              size={40}
              color={colors.zinc[400]}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-1 bg-background justify-center items-center">
          <ActivityIndicator size="large" color={colors.violet[600]} />
        </View>
      </View>
    );
  }

  return (
    <>
      <Container
        hasBack
        onBack={() => setIsModalOpen(false)}
        button={
          <TouchableOpacity
            activeOpacity={0.7}
            className="h-12 w-40 flex-row items-center justify-center border-2 border-violet-600 rounded-md"
            onPress={handleTicketTransfer}
          >
            <MaterialCommunityIcons
              name="transit-transfer"
              size={24}
              color={colors.violet[600]}
            />
            <Text className="text-white pl-2 text-base font-semibold">
              Transferir
            </Text>
          </TouchableOpacity>
        }
      >
        <ScrollView>
          <View className="flex-1 items-center">
            <View className="border-2 border-violet-600">
              <QRCode value={ticket.id} size={250} quietZone={5} />
            </View>
            <Text className="text-white mt-2 text-4xl font-semibold">
              {user?.name} {user?.surname}
            </Text>
            <Text className="text-white mt-2 text-3xl font-semibold">
              {user && formatCpf(user.cpf)}
            </Text>
            <Text className="text-white text-2xl mt-2 bg-violet-600 px-3 py-1 rounded-md font-semibold">
              {ticket?.ticket_type.name}{" "}
              {ticket && convertGenter(ticket.ticket_type.gender)}{" "}
            </Text>
          </View>
        </ScrollView>
      </Container>
    </>
  );
}
