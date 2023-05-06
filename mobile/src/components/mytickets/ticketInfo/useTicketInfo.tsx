import { useMyTickets } from "../../../contexts/MyTicketsContext";
import { useEffect, useState } from "react";
import { TicketInterface } from "./TicketInfo";

interface useTicketInfoProps {
  ticketId: string;
}

export default function useTicketInfo(props: useTicketInfoProps) {
  const { ticketId } = props;
  const { myTicketList } = useMyTickets();
  const [myTicket, setMyTicket] = useState<TicketInterface | undefined>(
    undefined
  );

  useEffect(() => {
    setMyTicket(myTicketList?.find((ticket) => ticket.id === ticketId));
  }, []);
  return { myTicket };
}
