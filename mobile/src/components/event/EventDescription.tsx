import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface EventDescriptionProps {
  description: string;
}

export default function EventDescription(props: EventDescriptionProps) {
  const { description } = props;

  return (
    <View className="flex-1 mx-1 mt-3">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex p-3 bg-zinc-800 rounded-md mb-32">
          <Text className="text-white font-semibold text-lg text-justify">
            {description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
