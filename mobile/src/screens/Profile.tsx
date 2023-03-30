import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const { user, Logout } = useAuth();
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 bg-background p-5">
      <View className="flex flex-row">
        <Text className="text-white text-4xl font-extrabold tracking-widest">
          Olá, {user?.name}
        </Text>
      </View>
      <Text className="text-white text-lg">Seja bem-vindo novamente!</Text>
      <View className="flex gap-2 pt-12">
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex flex-row border-2 bg-violet-600 p-4 rounded-md"
          onPress={() => navigate("profileInfo")}
        >
          <FontAwesome5 name="user-circle" size={24} color={colors.white} />
          <Text className="pl-3 text-white text-base font-semibold">
            Meus Dados
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex flex-row border-2 bg-violet-600 p-4 rounded-md"
        >
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={24}
            color={colors.white}
          />
          <Text className="pl-3 text-white text-base font-semibold">
            Meus Ingressos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={Logout}
          className="flex flex-row border-2 bg-zinc-700 p-4 rounded-md"
        >
          <MaterialCommunityIcons
            name="exit-to-app"
            size={24}
            color={colors.white}
          />
          <Text className="pl-3 text-white text-base font-semibold">Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
