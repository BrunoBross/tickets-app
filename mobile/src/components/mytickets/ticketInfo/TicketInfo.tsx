import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import QRCodeStyled from "react-native-qrcode-styled";
import { TicketLot } from "../../event/EventCard";
import convertGenter from "../../../utils/convertGender";
import colors from "tailwindcss/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import formatCpf from "../../../utils/formatCpf";
import Container from "../../Container";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ParamList } from "../../../@types/navigation";
import useTicketInfo from "./useTicketInfo";
import { useAuth } from "../../../contexts/AuthContext";
import QRCode from "./QRCode";

export interface TicketInterface {
  id: string;
  event_id: string;
  purchase_date: Date;
  ticket_lot_id: string;
  ticket_lot: TicketLot;
  user_id: string;
}

export default function Ticket() {
  const {
    params: { ticketId },
  } = useRoute<RouteProp<ParamList, "ticketInfo">>();
  const { myTicket } = useTicketInfo({ ticketId });
  const { user } = useAuth();
  const { navigate } = useNavigation();

  const TransferButton = () => (
    <TouchableOpacity
      activeOpacity={0.7}
      className="h-12 w-40 flex-row items-center justify-center border-2 border-violet-600 rounded-md"
      onPress={() => navigate("transferTicket", { ticketId })}
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
  );

  return (
    <>
      <Container hasBack button={<TransferButton />}>
        <View className="flex-1 justify-center items-center pb-20">
          {myTicket && <QRCode data={myTicket.id} />}
          <Text className="text-white mt-2 text-4xl font-semibold text-center">
            {user?.name} {user?.surname}
          </Text>
          <Text className="text-white mt-2 text-3xl font-semibold">
            {user && formatCpf(user.cpf)}
          </Text>
          <View className="mt-2 border-2 border-violet-600 rounded-md px-5 py-2">
            <Text className="text-white text-2xl font-semibold">
              {myTicket?.ticket_lot.event.name} {convertGenter("OTHER")}{" "}
            </Text>
          </View>
        </View>
      </Container>
    </>
  );
}
