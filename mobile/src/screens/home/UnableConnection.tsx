import { Text, View } from "react-native";

export default function UnableConnection() {
  return (
    <View className="flex-1 bg-background justify-center items-center">
      <Text className="text-white text-xl font-semibold">
        Sistema indisponível
      </Text>
    </View>
  );
}
