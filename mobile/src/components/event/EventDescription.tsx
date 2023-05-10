import { Text, View } from "react-native";

interface EventDescriptionProps {
  description: string;
}

export default function EventDescription(props: EventDescriptionProps) {
  const { description } = props;

  return (
    <View className="flex-1 rounded-md pt-5">
      <Text className="text-white font-semibold text-lg text-justify">
        {description}
      </Text>
    </View>
  );
}
