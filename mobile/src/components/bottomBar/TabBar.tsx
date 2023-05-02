import {
  NavigationState,
  SceneRendererProps,
  TabBar as TabViewBar,
} from "react-native-tab-view";
import FloatingButton from "./FloatingButton";
import { useCart } from "../../contexts/CartContext";
import { RouteType, useRoute } from "../../contexts/RouteContext";
import colors from "tailwindcss/colors";

export default function TabBar(
  props: SceneRendererProps & {
    navigationState: NavigationState<RouteType>;
  }
) {
  const { index, setIndex, renderIcon } = useRoute();
  const { cartList, clearCartList, handleBuyTickets } = useCart();

  const showCartButton = index !== 2 && cartList.length > 0;

  return (
    <>
      {showCartButton && (
        <FloatingButton
          title="Ir para o carrinho"
          handler={() => setIndex(2)}
        />
      )}
      {!showCartButton && cartList.length > 0 && (
        <>
          <FloatingButton
            title="Esvaziar carrinho"
            handler={clearCartList}
            upper
          />
          <FloatingButton title="Efetuar compra" handler={handleBuyTickets} />
        </>
      )}
      <TabViewBar
        {...props}
        renderIcon={renderIcon}
        labelStyle={{ display: "none" }}
        indicatorContainerStyle={{
          backgroundColor: "#09090a",
          borderTopColor: colors.zinc[700],
          borderTopWidth: 2,
        }}
        indicatorStyle={{
          backgroundColor: colors.white,
          top: -1.5,
          borderRadius: 100,
        }}
        pressColor={colors.transparent}
      />
    </>
  );
}
