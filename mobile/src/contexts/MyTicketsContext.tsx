import { ReactNode, createContext, useContext, useState } from "react";
import { UserInterface, useAuth } from "./AuthContext";
import useApi from "../lib/api";
import { TicketInterface } from "../components/mytickets/ticketInfo/TicketInfo";

interface MyTicketsProviderProps {
  children: ReactNode;
}

interface MyTicketsContextInterface {
  myTicketList: TicketInterface[] | null;
  isLoading: boolean;
  retrieveTickets: () => void;
}

const MyTicketsContext = createContext({} as MyTicketsContextInterface);

export default function MyTicketsProvider(props: MyTicketsProviderProps) {
  const { children } = props;
  const { user } = useAuth();
  const { api } = useApi();
  const [myTicketList, setMyTicketList] = useState<TicketInterface[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const retrieveTickets = async () => {
    setIsLoading(true);
    if (user) {
      const response = await api.get(`ticket/user/${user.id}`);
      setMyTicketList(response.data);
    }
    setIsLoading(false);
  };

  return (
    <MyTicketsContext.Provider
      value={{ myTicketList, isLoading, retrieveTickets }}
    >
      {children}
    </MyTicketsContext.Provider>
  );
}

export const useMyTickets = () => useContext(MyTicketsContext);
