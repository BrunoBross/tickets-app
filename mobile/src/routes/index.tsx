import { TabView } from "react-native-tab-view";
import { NavigationContainer } from "@react-navigation/native";
import Search from "../screens/Search";
import Cart from "../screens/Cart";
import { View } from "react-native";
import { useRoute } from "../contexts/RouteContext";
import TabBar from "../components/bottomBar/TabBar";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { ProfilePage } from "./custom.routes";

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
  const { index, routes, setIndex } = useRoute();

  return (
    <NavigationContainer>
      <View className="flex-1 pt-5 bg-background">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          tabBarPosition="bottom"
          keyboardDismissMode="auto"
          renderTabBar={(props) => <TabBar {...props} />}
        />
      </View>
    </NavigationContainer>
  );
}
