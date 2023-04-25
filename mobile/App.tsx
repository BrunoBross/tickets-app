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
import React, { useState } from "react";
import { TabBar, TabView } from "react-native-tab-view";
import ConnectionProvider from "./src/contexts/ConnectionContext";
import { ToastProvider } from "react-native-toast-notifications";
import CustomToast from "./src/components/CustomToast";
import AuthProvider from "./src/contexts/AuthContext";
import CartProvider from "./src/contexts/CartContext";
import { Routes } from "./src/routes";
import RouteProvider from "./src/contexts/RouteContext";

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
        offsetBottom={70}
        animationDuration={300}
        renderToast={(toast) => <CustomToast toast={toast} />}
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CartProvider>
              <RouteProvider>
                <Routes />
                <StatusBar
                  barStyle="light-content"
                  backgroundColor="transparent"
                  translucent
                />
              </RouteProvider>
            </CartProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ToastProvider>
    </ConnectionProvider>
  );
}
