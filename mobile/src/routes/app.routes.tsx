import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import { CartPage, HomePage, ProfilePage, SearchPage } from "./custom.routes";
import BottomBarNavigator from "../components/bottomBar/BottomBarNavigator";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import useApi from "../lib/api";
import colors from "tailwindcss/colors";
import { useConnection } from "../contexts/ConnectionContext";
import UnableConnection from "../components/UnableConnection";

export function AppRoutes() {
  const api = useApi();
  const { testConnection, isLoading, isServerOn } = useConnection();
  const isFocused = useIsFocused();
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  const keyboardWillShow = () => {
    setIsTabBarVisible(false);
  };
  const keyboardWillHide = () => {
    setIsTabBarVisible(true);
  };

  useEffect(() => {
    testConnection(api);
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

  if (isLoading) {
    return (
      <View className="flex-1 w-full h-full items-center justify-center bg-background">
        <ActivityIndicator size="large" color={colors.violet[600]} />
      </View>
    );
  }

  if (!isServerOn) {
    return <UnableConnection testConnection={() => testConnection(api)} />;
  }

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
