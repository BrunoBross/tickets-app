import { Skeleton } from "moti/skeleton";
import { View } from "react-native";

export default function EventDetailsSkeleton() {
  return (
    <View className="mb-3">
      <View>
        <Skeleton colorMode={"dark"} width={"100%"} height={160} />
      </View>
      <View className="flex-row items-center justify-between pb-3">
        <View className="pt-3">
          <View className="pb-3">
            <Skeleton colorMode={"dark"} width={"70%"} height={30} />
          </View>
          <View>
            <Skeleton colorMode={"dark"} width={"70%"} height={24} />
          </View>
        </View>
        <View className="pt-3">
          <Skeleton colorMode={"dark"} width={66} height={66} />
        </View>
      </View>
      <View className="pb-2">
        <Skeleton colorMode={"dark"} width={"100%"} height={45} />
      </View>
      <View className="items-center">
        <Skeleton colorMode={"dark"} width={"98%"} height={130} />
      </View>
    </View>
  );
}
