import { StatusBar } from "react-native";
import { View } from "react-native";
import AuthProvider from "./src/contexts/AuthContext";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <AuthProvider>
      <View className="w-full h-full items-center justify-between bg-background">
        <Routes />
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
      </View>
    </AuthProvider>
  );
}
