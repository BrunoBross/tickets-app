import { Text, TouchableOpacity } from "react-native";
import convertGenter from "../../utils/convertGender";
import formatEventDate from "../../utils/formatEventDate";
import Ticket, { TicketInterface } from "../mytickets/ticketInfo/TicketInfo";
import { useState } from "react";
import ContentModal from "../modals/ContentModal";
import { useNavigation } from "@react-navigation/native";

interface TicketInfoProps {
  ticket: TicketInterface;
}

export default function TicketListItem(props: TicketInfoProps) {
  const { ticket } = props;
  const { navigate } = useNavigation();
  const [isTicketInfoModalOpen, setIsTicketInfoModalOpen] = useState(false);

  return (
    <>
      <ContentModal
        isVisible={isTicketInfoModalOpen}
        setIsVisible={setIsTicketInfoModalOpen}
      >
        <Ticket />
      </ContentModal>
      <TouchableOpacity
        key={ticket.id}
        activeOpacity={0.7}
        className="h-32 mb-4 justify-center pl-4 bg-zinc-900 border-l-[6px] border-violet-600 rounded-md"
        onPress={() => navigate("ticketInfo", { ticketId: ticket.id })}
      >
        <Text className="text-violet-600  text-lg font-bold">
          NÃO UTILIZADO
        </Text>
        <Text className="text-white text-lg font-semibold">
          {ticket.ticket_lot.event.name} - {ticket.ticket_lot.event.attraction}
        </Text>
        <Text className="text-white text-lg font-semibold">
          {ticket.ticket_lot.ticket_type.name} - {convertGenter("OTHER")}
        </Text>
        <Text className="text-white text-lg font-semibold">
          {formatEventDate(ticket.ticket_lot.event.date)}
        </Text>
      </TouchableOpacity>
    </>
  );
}
