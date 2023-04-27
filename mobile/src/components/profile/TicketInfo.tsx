import { Text, TouchableOpacity } from "react-native";
import convertGenter from "../../utils/convertGender";
import formatEventDate from "../../utils/formatEventDate";
import Ticket, { TicketInterface } from "./Ticket";
import { useState } from "react";
import ContentModal from "../modals/ContentModal";

interface TicketInfoProps {
  ticket: TicketInterface;
}

export default function TicketInfo(props: TicketInfoProps) {
  const { ticket } = props;
  const [isTicketInfoModalOpen, setIsTicketInfoModalOpen] = useState(false);

  return (
    <>
      <ContentModal
        isVisible={isTicketInfoModalOpen}
        setIsVisible={setIsTicketInfoModalOpen}
      >
        <Ticket ticket={ticket} setIsModalOpen={setIsTicketInfoModalOpen} />
      </ContentModal>
      <TouchableOpacity
        key={ticket.id}
        activeOpacity={0.7}
        className="mb-4 bg-zinc-900 border-l-[6px] border-violet-600 rounded-md p-4"
        onPress={() => setIsTicketInfoModalOpen(true)}
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
