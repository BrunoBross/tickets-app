import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

interface UnableConnectionProps {
  testConnection: () => void;
}

export default function UnableConnection(props: UnableConnectionProps) {
  const { testConnection } = props;

  return (
    <View className="flex-1 bg-background justify-center items-center gap-y-4">
      <Text className="text-white text-xl font-semibold">
        Sistema indisponível
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex p-3 h-14 flex-row items-center bg-violet-600 rounded-md"
        onPress={testConnection}
      >
        <MaterialCommunityIcons name="reload" size={24} color={colors.white} />
        <Text className="text-white pl-2 text-base font-semibold">
          Tentar novamente
        </Text>
      </TouchableOpacity>
    </View>
  );
}
