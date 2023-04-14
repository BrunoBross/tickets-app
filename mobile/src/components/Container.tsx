import { ReactNode } from "react";
import { Text, View } from "react-native";

interface ContainerProps {
  title: string;
  children: ReactNode;
}

export default function Container(props: ContainerProps) {
  const { title, children } = props;

  return (
    <View className="flex-1 bg-background p-5 pb-0 gap-5">
      <View className="justify-center h-14">
        <Text className=" text-white text-4xl font-extrabold tracking-widest">
          {title}
        </Text>
      </View>
      <View className="flex-1">{children}</View>
    </View>
  );
}
