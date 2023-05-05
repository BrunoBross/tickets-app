import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCodeStyled from "react-native-qrcode-styled";
import { useAuth } from "../../contexts/AuthContext";
import { TicketLot } from "../../components/event/EventCard";
import convertGenter from "../../utils/convertGender";
import colors from "tailwindcss/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import formatCpf from "../../utils/formatCpf";
import Container from "../Container";
import FormatDate from "../../utils/formatDate";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import useApi from "../../lib/api";
import { ParamList } from "../../@types/navigation";

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
  const { user } = useAuth();
  const { api } = useApi();
  const { navigate } = useNavigation();
  const [ticket, setTicket] = useState<TicketInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const retrieveTicket = async () => {
    setIsLoading(true);
    if (user) {
      const response = await api.get(`ticket/${ticketId}`);
      setTicket(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    retrieveTicket();
  }, []);

  if (!ticket || isLoading) {
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
      <Container
        hasBack
        button={
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
        }
      >
        <View className="flex-1 justify-center items-center pb-20">
          <QRCodeStyled
            data={ticket.id}
            pieceSize={8}
            color={colors.white}
            gradient={{
              options: {
                colors: [colors.violet[700], colors.violet[100]],
              },
            }}
            pieceBorderRadius={5}
            isPiecesGlued
          />
          <Text className="text-white mt-2 text-4xl font-semibold text-center">
            {user?.name} {user?.surname}
          </Text>
          <Text className="text-white mt-2 text-3xl font-semibold">
            {user && formatCpf(user.cpf)}
          </Text>
          <View className="mt-2 border-2 border-violet-600 rounded-md px-5 py-2">
            <Text className="text-white text-2xl font-semibold">
              {ticket.ticket_lot.event.name} {ticket && convertGenter("OTHER")}{" "}
            </Text>
          </View>
        </View>
      </Container>
    </>
  );
}
