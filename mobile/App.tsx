import "react-native-reanimated";
import "react-native-gesture-handler";
import { ActivityIndicator, StatusBar } from "react-native";
import { View } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import colors from "tailwindcss/colors";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import ConnectionProvider from "./src/contexts/ConnectionContext";
import { ToastProvider } from "react-native-toast-notifications";
import CustomToast from "./src/components/CustomToast";
import AuthProvider from "./src/contexts/AuthContext";
import CartProvider from "./src/contexts/CartContext";
import { Routes } from "./src/routes";
import RouteProvider from "./src/contexts/RouteContext";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import MyTicketsProvider from "./src/contexts/MyTicketsContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  const queryClient = new QueryClient();

  if (!fontsLoaded) {
    return (
      <View className="flex-1 w-full h-full items-center justify-center bg-background">
        <ActivityIndicator size="large" color={colors.violet[600]} />
      </View>
    );
  }

  return (
    <ConnectionProvider>
      <ToastProvider
        placement="bottom"
        offsetBottom={66}
        animationDuration={300}
        duration={2000}
        renderToast={(toast) => <CustomToast toast={toast} />}
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CartProvider>
              <RouteProvider>
                <MyTicketsProvider>
                  <NavigationContainer theme={DarkTheme}>
                    <Routes />
                    <StatusBar
                      barStyle="light-content"
                      backgroundColor={colors.transparent}
                      translucent
                    />
                  </NavigationContainer>
                </MyTicketsProvider>
              </RouteProvider>
            </CartProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ToastProvider>
    </ConnectionProvider>
  );
}
