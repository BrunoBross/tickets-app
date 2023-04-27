import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useAuth } from "../../contexts/AuthContext";
import {
  EventInterface,
  TicketLot,
  TicketType,
} from "../../components/event/EventCard";
import convertGenter from "../../utils/convertGender";
import colors from "tailwindcss/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import formatCpf from "../../utils/formatCpf";
import Container from "../Container";
import ContentModal from "../modals/ContentModal";
import TransferTicket from "../transferTicket/TransferTicket";
import useTransferTicket from "../transferTicket/useTransferTicket";

export interface TicketInterface {
  id: string;
  event_id: string;
  purchase_date: string;
  ticket_lot_id: string;
  ticket_lot: TicketLot;
  user_id: string;
}

interface TicketProps {
  ticket: TicketInterface;
  setIsModalOpen: (state: boolean) => void;
}

export default function Ticket(props: TicketProps) {
  const { ticket, setIsModalOpen } = props;
  const { user } = useAuth();
  const {
    createTransferTicketForm,
    handleTransferTicket,
    isConfirmTransferModalOpen,
    isTransferModalOpen,
    onSubmit,
    setIsConfirmTransferModalOpen,
    setIsTransferModalOpen,
    userTransfer,
  } = useTransferTicket({
    ticket,
    setIsModalOpen,
  });

  if (!ticket) {
    return (
      <Container hasBack>
        <View className="flex-1 bg-background justify-center items-center">
          <ActivityIndicator size="large" color={colors.violet[600]} />
        </View>
      </Container>
    );
  }

  return (
    <>
      <ContentModal
        isVisible={isTransferModalOpen}
        setIsVisible={setIsTransferModalOpen}
      >
        <TransferTicket
          ticket={ticket}
          createTransferTicketForm={createTransferTicketForm}
          handleTransferTicket={handleTransferTicket}
          isConfirmTransferModalOpen={isConfirmTransferModalOpen}
          onSubmit={onSubmit}
          setIsConfirmTransferModalOpen={setIsConfirmTransferModalOpen}
          setIsTransferModalOpen={setIsTransferModalOpen}
          userTransfer={userTransfer}
        />
      </ContentModal>
      <Container
        hasBack
        onBack={() => setIsModalOpen(false)}
        button={
          <TouchableOpacity
            activeOpacity={0.7}
            className="h-12 w-40 flex-row items-center justify-center border-2 border-violet-600 rounded-md"
            onPress={() => setIsTransferModalOpen(true)}
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
              {ticket.ticket_lot.event.name} {ticket && convertGenter("OTHER")}{" "}
            </Text>
          </View>
        </ScrollView>
      </Container>
    </>
  );
}
