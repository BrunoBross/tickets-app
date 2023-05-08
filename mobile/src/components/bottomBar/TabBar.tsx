import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import FloatingButton from "./FloatingButton";
import { useCart } from "../../contexts/CartContext";

const pageIdxToExclude = [2, 3];

export default function TabBar(props: MaterialTopTabBarProps) {
  const { handleClearCartList, handleBuyTickets, showCartButton } = useCart();

  return (
    <>
      {showCartButton && !pageIdxToExclude.includes(props.state.index) && (
        <FloatingButton
          title="Ir para o carrinho"
          handler={() => props.navigation.navigate("cart")}
        />
      )}

      {showCartButton && props.state.index === 2 && (
        <>
          <FloatingButton
            title="Esvaziar carrinho"
            handler={handleClearCartList}
            upper
          />
          <FloatingButton title="Efetuar compra" handler={handleBuyTickets} />
        </>
      )}
      <MaterialTopTabBar {...props} />
    </>
  );
}
