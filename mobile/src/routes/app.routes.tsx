import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import { CartPage, HomePage, ProfilePage, SearchPage } from "./custom.routes";
import BottomBarNavigator from "../components/bottomBar/BottomBarNavigator";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Keyboard, KeyboardAvoidingView, Platform } from "react-native";

export function AppRoutes() {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);
  const keyboardWillShow = () => {
    setIsTabBarVisible(false);
  };
  const keyboardWillHide = () => {
    setIsTabBarVisible(true);
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardWillShow
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardWillHide
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
      className="flex-1"
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
    >
      {isFocused && (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
          tabBar={(props) =>
            isTabBarVisible && <BottomBarNavigator {...props} />
          }
        >
          <Tab.Screen name="homePage" component={HomePage} />
          <Tab.Screen name="searchPage" component={SearchPage} />
          <Tab.Screen name="cartPage" component={CartPage} />
          <Tab.Screen name="profilePage" component={ProfilePage} />
        </Tab.Navigator>
      )}
    </KeyboardAvoidingView>
  );
}
