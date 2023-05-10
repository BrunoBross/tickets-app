import { Skeleton } from "moti/skeleton";
import { View } from "react-native";

export default function EventTicketListSkeleton() {
  return (
    <View className="mt-2">
      <View className="items-center mb-2">
        <Skeleton colorMode={"dark"} width={"98%"} height={112} />
      </View>
      <View className="items-center mb-2">
        <Skeleton colorMode={"dark"} width={"98%"} height={112} />
      </View>
      <View className="items-center mb-2">
        <Skeleton colorMode={"dark"} width={"98%"} height={112} />
      </View>
      <View className="items-center mb-2">
        <Skeleton colorMode={"dark"} width={"98%"} height={112} />
      </View>
    </View>
  );
}
