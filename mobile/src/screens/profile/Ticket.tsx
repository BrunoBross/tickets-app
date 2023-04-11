import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { TicketType } from "../../components/EventCard";
import convertGenter from "../../utils/convertGender";
import colors from "tailwindcss/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ConfirmModal from "../../components/modals/ConfirmModal";
import MaskInput, { Masks } from "react-native-mask-input";
import clsx from "clsx";
import { verifyCpf, formatCpf } from "../../components/register/utils";
import { UserInterface } from "../../contexts/AuthContext";
import useApi from "../../lib/api";

interface Params {
  ticketId: string;
}

interface TicketInterface {
  id: string;
  event_id: string;
  purchase_date: string;
  ticket_type: TicketType;
  ticket_type_id: string;
  user_id: string;
}

export default function Ticket() {
  const { user } = useAuth();
  const { goBack } = useNavigation();
  const api = useApi();
  const route = useRoute();
  const { ticketId } = route.params as Params;
  const [ticket, setTicket] = useState<TicketInterface | null>(null);

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

    if (formatCpf(cpfTransfer) === user?.cpf) {
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
        ticketId: ticketId,
        newUserId: userTransfer!!.id,
      })
      .then(() => {
        setIsAskCpfModalOpen(false);
        setIsConfirmTransferModalOpen(false);
        goBack();
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

  useEffect(() => {
    const retrieveTicketType = async () => {
      const response = await api.get(`/ticket/${ticketId}`);
      setTicket(response.data);
    };

    retrieveTicketType();
  }, []);

  return (
    <>
      <ConfirmModal
        isOpen={isAskCpfModalOpen}
        title="Transferir"
        confirmText="Avançar"
        cancelText="Cancelar"
        handler={confirmAskTransfer}
        cancelHandler={cancelAskTransfer}
      >
        <Text className="text-white text-base font-semibold">
          Pra quem deseja transferir?
        </Text>
        <View>
          <MaskInput
            selectionColor={colors.white}
            placeholderTextColor={colors.zinc[500]}
            value={cpfTransfer}
            placeholder="CPF"
            inputMode="numeric"
            mask={Masks.BRL_CPF}
            maxLength={14}
            className={clsx(
              "h-14 p-3 text-lg text-white bg-zinc-900 border-2 rounded-md",
              {
                ["focus:border-green-600 border-zinc-600"]: !transferError,
                ["border-red-600"]: transferError,
              }
            )}
            onChangeText={(cpf) => requestUser(cpf)}
          />
          {transferError && (
            <Text className="text-red-600 text-base font-semibold">
              {transferError}
            </Text>
          )}
        </View>
      </ConfirmModal>
      <ConfirmModal
        isOpen={isConfirmTransferModalOpen}
        title="Confirmar"
        confirmText="Confirmar"
        cancelText="Cancelar"
        handler={confirmTransfer}
        cancelHandler={cancelConfirmTransfer}
        isDanger
      >
        <View>
          <Text className="text-white text-base font-semibold">
            Transferir ingresso para{" "}
            <Text className="text-red-600 text-lg font-semibold">
              {userTransfer?.name.toUpperCase()}
              {userTransfer?.surname.toUpperCase()}
            </Text>
          </Text>
        </View>
      </ConfirmModal>
      <View className="flex-1 bg-background p-5 gap-10">
        <View className="flex-1 flex-row">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={goBack}
            className="flex-1"
          >
            <Ionicons
              name="arrow-back-outline"
              size={40}
              color={colors.zinc[400]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-1 h-14 flex-row items-center justify-center border-2 border-violet-600 rounded-md"
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
        </View>
        <ScrollView>
          <View className="flex-1 items-center">
            <View className="border-[3px] border-violet-600">
              <QRCode value={ticketId} size={250} />
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
      </View>
    </>
  );
}
