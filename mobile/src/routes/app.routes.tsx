import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import { CartPage, HomePage, ProfilePage, SearchPage } from "./custom.routes";
import BottomBarNavigator from "../components/bottomBar/BottomBarNavigator";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import UnableConnection from "../screens/home/UnableConnection";
import useApi from "../lib/api";

export function AppRoutes() {
  const api = useApi();
  const isFocused = useIsFocused();
  const [isServerOn, setIsServerOn] = useState(false);
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  const keyboardWillShow = () => {
    setIsTabBarVisible(false);
  };
  const keyboardWillHide = () => {
    setIsTabBarVisible(true);
  };

  useEffect(() => {
    api.get("/connection").then((response: any) => {
      if (response.status == 200) {
        setIsServerOn(true);
      }
    });
  }, []);

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
            isTabBarVisible && isServerOn && <BottomBarNavigator {...props} />
          }
        >
          <Tab.Screen
            name="homePage"
            component={isServerOn ? HomePage : UnableConnection}
          />
          <Tab.Screen
            name="searchPage"
            component={isServerOn ? SearchPage : UnableConnection}
          />
          <Tab.Screen
            name="cartPage"
            component={isServerOn ? CartPage : UnableConnection}
          />
          <Tab.Screen
            name="profilePage"
            component={isServerOn ? ProfilePage : UnableConnection}
          />
        </Tab.Navigator>
      )}
    </KeyboardAvoidingView>
  );
}
