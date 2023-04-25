import { useState } from "react";
import { TabBar, TabView } from "react-native-tab-view";
import { ProfilePage } from "./custom.routes";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Cart from "../screens/Cart";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useCart } from "../contexts/CartContext";
import FloatingButton from "../components/bottomBar/FloatingButton";

interface RouteType {
  key: string;
  title: string;
  icon: string | any;
  iconFocused: string | any;
}

interface RenderType {
  route: RouteType;
  focused: boolean;
}

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
  const [index, setIndex] = useState(0);
  const [routes] = useState<RouteType[]>([
    { key: "home", title: "Home", icon: "home-outline", iconFocused: "home" },
    {
      key: "search",
      title: "Search",
      icon: "search-outline",
      iconFocused: "search",
    },
    { key: "cart", title: "Cart", icon: "cart-outline", iconFocused: "cart" },
    {
      key: "profile",
      title: "Profile",
      icon: "person-circle-outline",
      iconFocused: "person-circle",
    },
  ]);

  const { cartList, cartTotalPrice, clearCartList, handleBuyTickets } =
    useCart();
  const showCartButton = index !== 2 && cartList.length > 0;

  const renderIcon = ({ route, focused }: RenderType) => {
    const iconName = focused ? route.iconFocused : route.icon;
    const iconColor = focused ? colors.white : colors.zinc[700];
    return <Ionicons name={iconName} size={30} color={iconColor} />;
  };

  return (
    <NavigationContainer>
      <View className="flex-1 pt-2 bg-background">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          tabBarPosition="bottom"
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
                activeColor="red"
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
