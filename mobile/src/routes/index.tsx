import { TabBar, TabView } from "react-native-tab-view";
import { ProfilePage } from "./custom.routes";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Cart from "../screens/Cart";
import { View } from "react-native";
import colors from "tailwindcss/colors";
import { useCart } from "../contexts/CartContext";
import FloatingButton from "../components/bottomBar/FloatingButton";
import { useRoute } from "../contexts/RouteContext";

const renderScene = ({ route }: any) => {
  switch (route.key) {
    case "home":
      return <Home />;
    case "search":
      return <Search />;
    case "cart":
      return <Cart />;
    case "profile":
      return <ProfilePage />;
    default:
      return null;
  }
};

export function Routes() {
  const { index, routes, setIndex, renderIcon } = useRoute();
  const { cartList, clearCartList, handleBuyTickets } = useCart();

  const showCartButton = index !== 2 && cartList.length > 0;

  return (
    <NavigationContainer>
      <View className="flex-1 pt-5 bg-background">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          tabBarPosition="bottom"
          keyboardDismissMode="auto"
          renderTabBar={(props) => (
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
                  <FloatingButton
                    title="Efetuar compra"
                    handler={handleBuyTickets}
                  />
                </>
              )}
              <TabBar
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
          )}
        />
      </View>
    </NavigationContainer>
  );
}
