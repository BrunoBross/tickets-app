import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { user, Logout } = useAuth();

  return (
    <View className="flex-1 bg-background p-5 gap-5">
      <View className="flex flex-row">
        <Text className="text-white text-4xl font-extrabold tracking-widest">
          Olá, {user?.name}
        </Text>
      </View>
      <Text className="text-white text-lg">Seja bem-vindo novamente!</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={Logout}
        className="border-2 bg-zinc-800 p-4 rounded-md items-center"
      >
        <Text className="text-white text-lg">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
