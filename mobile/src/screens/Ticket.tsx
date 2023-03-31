import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { useAuth } from "../contexts/AuthContext";
import formatCpf from "../utils/formatCpf";
import { useEffect, useState } from "react";
import { TicketType } from "../components/EventCard";
import { api } from "../lib/api";
import convertGenter from "../utils/convertGender";
import { GenderEnum } from "../utils/convertGender";

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
  const route = useRoute();
  const { ticketId } = route.params as Params;
  const [ticket, setTicket] = useState<TicketInterface | null>(null);

  useEffect(() => {
    const retrieveTicketType = async () => {
      const response = await api.get(`/ticket/${ticketId}`);
      setTicket(response.data);
    };

    retrieveTicketType();
  }, []);

  return (
    <View className="flex-1 bg-background p-5 gap-5">
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <Ionicons name="arrow-back-outline" size={40} color="#a1a1aa" />
      </TouchableOpacity>
      <View className="flex items-center">
        <View className="border-4 border-violet-500">
          <QRCode value={ticketId} size={250} />
        </View>
        <Text className="text-white mt-4 text-4xl font-semibold">
          {user?.name} {user?.surname}
        </Text>
        <Text className="text-white mt-4 text-3xl font-semibold">
          {user && formatCpf(user.cpf)}
        </Text>
        <Text className="text-white text-2xl mt-4 bg-violet-500 px-3 py-1 rounded-md font-semibold">
          {ticket?.ticket_type.name}{" "}
          {ticket &&
            convertGenter(
              GenderEnum[ticket.ticket_type.gender as keyof typeof GenderEnum]
            )}{" "}
        </Text>
      </View>
    </View>
  );
}
