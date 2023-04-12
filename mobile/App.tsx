import { ActivityIndicator, StatusBar } from "react-native";
import { View } from "react-native";
import AuthProvider from "./src/contexts/AuthContext";
import { Routes } from "./src/routes";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import colors from "tailwindcss/colors";
import CartProvider from "./src/contexts/CartContext";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import ConnectionProvider from "./src/contexts/ConnectionContext";

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
      <View className="flex-1 w-full h-full items-center justify-between bg-background">
        <ActivityIndicator size="large" color={colors.violet[600]} />
      </View>
    );
  }

  return (
    <ConnectionProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <View className="w-full h-full items-center justify-between bg-background">
              <Routes />
              <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
              />
            </View>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ConnectionProvider>
  );
}
