import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface CartProviderProps {
  children: React.ReactNode;
}

interface TicketCartInterface {
  id: string;
  eventId: string;
  ticketTypeId: string;
}

interface CartContextInterface {
  cartList: TicketCartInterface[] | [];
  setCartList: Dispatch<SetStateAction<TicketCartInterface[] | []>>;
  addCartList: (ticket: TicketCartInterface) => void;
  clearCartList: () => void;
}

const CartContext = createContext({} as CartContextInterface);

export default function CartProvider(props: CartProviderProps) {
  const { children } = props;
  const [cartList, setCartList] = useState<TicketCartInterface[] | []>([]);

  const addCartList = (ticket: TicketCartInterface) => {
    console.log(cartList);
    setCartList([...cartList, ticket]);
  };

  const clearCartList = () => {
    setCartList([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
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
