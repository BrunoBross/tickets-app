import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TicketLot } from "../components/event/EventCard";
import { useAuth } from "./AuthContext";
import useApi from "../lib/api";
import { useToast } from "react-native-toast-notifications";
import ConfirmModal from "../components/modals/ConfirmModal";

interface CartProviderProps {
  children: ReactNode;
}

export interface TicketCartInterface {
  id: string;
  eventId: string;
  ticket_lot: TicketLot;
}

interface CartContextInterface {
  cartList: TicketCartInterface[] | [];
  cartTotalPrice: number;
  cartTotalTax: number;
  showCartButton: boolean;
  setCartList: Dispatch<SetStateAction<TicketCartInterface[] | []>>;
  addCartList: (ticket: TicketCartInterface) => void;
  handleClearCartList: () => void;
  deleteTicket: (id: string) => void;
  handleBuyTickets: () => void;
}

const CartContext = createContext({} as CartContextInterface);

export default function CartProvider(props: CartProviderProps) {
  const { children } = props;
  const { user } = useAuth();
  const { api } = useApi();
  const [cartList, setCartList] = useState<TicketCartInterface[]>([]);
  const [showCartButton, setShowCartButton] = useState(false);
  const [isConfirmEmptyCartListOpen, setIsConfirmEmptyCartListOpen] =
    useState(false);
  const toast = useToast();

  useEffect(() => {
    if (cartList.length > 0) {
      setShowCartButton(true);
    } else {
      setShowCartButton(false);
    }
  }, [cartList]);

  const cartTotalPrice = useMemo(() => {
    return cartList.reduce((total, ticket) => {
      return total + ticket.ticket_lot.price + ticket.ticket_lot.tax;
    }, 0);
  }, [cartList]);

  const cartTotalTax = useMemo(() => {
    return cartList.reduce((total, ticket) => {
      return total + ticket.ticket_lot.tax;
    }, 0);
  }, [cartList]);

  const addCartList = (ticket: TicketCartInterface) => {
    setCartList((prevState) => [...prevState, ticket]);
  };

  const handleClearCartList = () => {
    setIsConfirmEmptyCartListOpen(true);
  };

  const clearCartList = () => {
    setIsConfirmEmptyCartListOpen(false);
    toast.show("O carrinho foi esvaziado", { type: "success" });
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
          userId: user.id,
          ticketLotId: event.ticket_lot.id,
        };

        await api({
          method: "post",
          url: "/ticket",
          data: ticket,
        }).catch((error) => {
          toast.show(error.response.data.error, { type: "danger" });
        });
      });
      setCartList([]);
      toast.show("Compra efetuada com sucesso", { type: "success" });
    }
  };

  return (
    <>
      <ConfirmModal
        isVisible={isConfirmEmptyCartListOpen}
        setIsVisible={setIsConfirmEmptyCartListOpen}
        title="Esvaziar"
        message="Tem certeza que deseja esvaziar o carrinho?"
        confirmText="Esvaziar"
        cancelText="Cancelar"
        handler={clearCartList}
        isDanger
      />
      <CartContext.Provider
        value={{
          cartList,
          cartTotalPrice,
          cartTotalTax,
          showCartButton,
          setCartList,
          addCartList,
          handleClearCartList,
          deleteTicket,
          handleBuyTickets,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}

export const useCart = () => useContext(CartContext);
