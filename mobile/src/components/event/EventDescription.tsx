import { Text, View } from "react-native";

interface EventDescriptionProps {
  description: string;
}

export default function EventDescription(props: EventDescriptionProps) {
  const { description } = props;

  return (
    <View className="flex-1 px-1 pt-2 bg-background">
      <View className="flex p-3 bg-zinc-800 rounded-md mb-32">
        <Text className="text-white font-semibold text-lg text-justify">
          {description}
        </Text>
      </View>
    </View>
  );
}
