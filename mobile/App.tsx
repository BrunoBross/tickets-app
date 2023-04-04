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
import RegisterProvider from "./src/contexts/RegisterContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={colors.violet[600]} />;
  }

  return (
    <AuthProvider>
      <RegisterProvider>
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
      </RegisterProvider>
    </AuthProvider>
  );
}
