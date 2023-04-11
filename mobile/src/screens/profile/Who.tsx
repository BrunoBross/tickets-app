import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

export default function Who() {
  const { goBack } = useNavigation();

  return (
    <View className="flex-1 bg-background p-5 gap-5">
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <Ionicons
          name="arrow-back-outline"
          size={40}
          color={colors.zinc[400]}
        />
      </TouchableOpacity>
      <Text className="text-white text-base font-semibold">
        Somos uma empresa séria
      </Text>
    </View>
  );
}
