import { Text, View } from "react-native";

interface EventDescriptionProps {
  description: string;
}

export default function EventDescription(props: EventDescriptionProps) {
  const { description } = props;

  return (
    <View className="flex-1">
      <View className="flex p-3 bg-zinc-800 rounded-md">
        <Text className="text-white font-semibold text-lg">{description}</Text>
      </View>
    </View>
  );
}
