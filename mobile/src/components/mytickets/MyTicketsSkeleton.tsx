import { View } from "react-native";
import Container from "../Container";
import { Skeleton } from "moti/skeleton";

export default function MyTicketsSkeleton() {
  return (
    <Container hasBack>
      <View className="h-32 mb-4">
        <Skeleton colorMode={"dark"} width={"100%"} height={128} />
      </View>
      <View className="h-32 mb-4">
        <Skeleton colorMode={"dark"} width={"100%"} height={128} />
      </View>
      <View className="h-32 mb-4">
        <Skeleton colorMode={"dark"} width={"100%"} height={128} />
      </View>
      <View className="h-32 mb-4">
        <Skeleton colorMode={"dark"} width={"100%"} height={128} />
      </View>
      <View className="h-32 mb-4">
        <Skeleton colorMode={"dark"} width={"100%"} height={128} />
      </View>
    </Container>
  );
}
