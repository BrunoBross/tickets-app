import { Skeleton } from "moti/skeleton";
import { View } from "react-native";

export default function EventTicketListSkeleton() {
  return (
    <View>
      <View className="items-center mb-3">
        <Skeleton colorMode={"dark"} width={"98%"} height={130} />
      </View>
      <View className="items-center mb-3">
        <Skeleton colorMode={"dark"} width={"98%"} height={130} />
      </View>
      <View className="items-center mb-3">
        <Skeleton colorMode={"dark"} width={"98%"} height={130} />
      </View>
    </View>
  );
}
