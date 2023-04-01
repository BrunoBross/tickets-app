import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { TicketType } from "../components/EventCard";

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
}

const CartContext = createContext({} as CartContextInterface);

export default function CartProvider(props: CartProviderProps) {
  const { children } = props;
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
    setCartList((prevState) => [...cartList, ticket]);
  };

  const clearCartList = () => {
    setCartList([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        cartTotalPrice,
        setCartList,
        addCartList,
        clearCartList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
