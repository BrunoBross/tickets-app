import { NavigationContainer, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import BottomBarNavigator from "../components/BottomBarNavigator";
import { AppRoutes } from "./app.routes";

export function Routes() {
  return (
    <View className="flex-1 w-full mt-16">
      <NavigationContainer>
        <AppRoutes />
        <BottomBarNavigator />
      </NavigationContainer>
    </View>
  );
}
