import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { TicketType } from "../components/EventCard";
import { useAuth } from "./AuthContext";
import { api } from "../lib/api";

interface CartProviderProps {
  children: React.ReactNode;
}

export interface TicketCartInterface {
  id: string;
  eventId: string;
  ticketType: TicketType;
}

interface CartContextInterface {
  cartList: TicketCartInterface[] | [];
  cartTotalPrice: number;
  setCartList: Dispatch<SetStateAction<TicketCartInterface[] | []>>;
  addCartList: (ticket: TicketCartInterface) => void;
  clearCartList: () => void;
  deleteTicket: (id: string) => void;
  handleBuyTickets: () => void;
}

const CartContext = createContext({} as CartContextInterface);

export default function CartProvider(props: CartProviderProps) {
  const { children } = props;
  const { user } = useAuth();
  const [cartList, setCartList] = useState<TicketCartInterface[]>([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  useEffect(() => {
    const newCartTotalPrice = cartList.reduce(
      (total: any, item: TicketCartInterface) => {
        return total + item.ticketType.price;
      },
      0
    );

    setCartTotalPrice(newCartTotalPrice);
  }, [cartList]);

  const addCartList = (ticket: TicketCartInterface) => {
    setCartList((prevState) => [...prevState, ticket]);
  };

  const clearCartList = () => {
    setCartList([]);
  };

  const deleteTicket = (id: string) => {
    const newCartList = cartList.filter((ticket) => ticket.id !== id);
    setCartList(newCartList);
  };

  const handleBuyTickets = async () => {
    if (user) {
      cartList.forEach(async (event) => {
        const ticket = {
          user_id: user.id,
          event_id: event.eventId,
          ticket_type_id: event.ticketType.id,
        };

        await api({
          method: "post",
          url: "/ticket",
          data: ticket,
        });
      });
      clearCartList();
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        cartTotalPrice,
        setCartList,
        addCartList,
        clearCartList,
        deleteTicket,
        handleBuyTickets,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
