import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import formatBirthDate from "../../utils/formatBirthDate";
import formatCpf from "../../utils/formatCpf";
import colors from "tailwindcss/colors";
import { FontAwesome } from "@expo/vector-icons";

export default function ProfileInfo() {
  const { goBack } = useNavigation();
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-background p-5">
      <View className="justify-center h-14">
        <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
          <Ionicons
            name="arrow-back-outline"
            size={40}
            color={colors.zinc[400]}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity activeOpacity={0.7} className="items-center">
          <FontAwesome name="user-circle-o" size={90} color={colors.white} />
        </TouchableOpacity>
        <View className="flex gap-y-3 mt-5">
          <View className="flex-row">
            <View className="h-full w-1 bg-violet-600 mr-4"></View>
            <Text className="text-white font-semibold text-base">
              Meus dados
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-zinc-500 font-semibold text-base">
              Nome completo
            </Text>
            <Text className="text-white font-semibold text-base">
              {user?.name.toUpperCase()} {user?.surname.toUpperCase()}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-zinc-500 font-semibold text-base">
              Data nascimento
            </Text>
            <Text className="text-white font-semibold text-base">
              {user?.birth && formatBirthDate(user.birth)}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-zinc-500 font-semibold text-base">
              E-mail
            </Text>
            <Text className="text-white font-semibold text-base">
              {user?.email}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-zinc-500 font-semibold text-base">CPF</Text>
            <Text className="text-white font-semibold text-base">
              {user?.cpf && formatCpf(user.cpf)}
            </Text>
          </View>
        </View>
        <View className="flex gap-y-3 mt-5">
          <View className="flex-row">
            <View className="h-full w-1 bg-violet-600 mr-4"></View>
            <Text className="text-white font-semibold text-base">Endereço</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-zinc-500 font-semibold text-base">Rua</Text>
            <Text className="text-white font-semibold text-base">
              {user?.address}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
