import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import { CartPage, HomePage, ProfilePage, SearchPage } from "./custom.routes";
import BottomBarNavigator from "../components/BottomBarNavigator";

export function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <BottomBarNavigator {...props} />}
    >
      <Tab.Screen name="homePage" component={HomePage} />
      <Tab.Screen name="searchPage" component={SearchPage} />
      <Tab.Screen name="cartPage" component={CartPage} />
      <Tab.Screen name="profilePage" component={ProfilePage} />
    </Tab.Navigator>
  );
}
