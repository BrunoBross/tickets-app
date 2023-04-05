import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import formatBirthDate from "../utils/formatBirthDate";
import formatCpf from "../utils/formatCpf";
import formatCep from "../utils/formatCep";
import colors from "tailwindcss/colors";

export default function ProfileInfo() {
  const { goBack } = useNavigation();
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-background p-5 gap-5">
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <Ionicons
          name="arrow-back-outline"
          size={40}
          color={colors.zinc[400]}
        />
      </TouchableOpacity>
      <View>
        <Text className="text-white font-semibold text-base">
          {user?.name} {user?.surname}
        </Text>
        <Text className="text-white font-semibold text-base">
          {user?.birth && formatBirthDate(user.birth)}
        </Text>
        <Text className="text-white font-semibold text-base">
          {user?.cpf && formatCpf(user.cpf)}
        </Text>
        <Text className="text-white font-semibold text-base">
          {user?.address} - {user?.zip_code && formatCep(user.zip_code)}
        </Text>
      </View>
    </View>
  );
}
