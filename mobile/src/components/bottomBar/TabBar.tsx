import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import FloatingButton from "./FloatingButton";
import { useCart } from "../../contexts/CartContext";

export default function TabBar(props: MaterialTopTabBarProps) {
  const { clearCartList, handleBuyTickets, showCartButton } = useCart();

  const showFloatingButtons = showCartButton && props.state.index !== 2;
  const showCartButtons = showCartButton && props.state.index === 2;

  return (
    <>
      {showFloatingButtons && (
        <FloatingButton
          title="Ir para o carrinho"
          handler={() => props.navigation.navigate("cart")}
        />
      )}

      {showCartButtons && (
        <>
          <FloatingButton
            title="Esvaziar carrinho"
            handler={clearCartList}
            upper
          />
          <FloatingButton title="Efetuar compra" handler={handleBuyTickets} />
        </>
      )}
      <MaterialTopTabBar {...props} />
    </>
  );
}
