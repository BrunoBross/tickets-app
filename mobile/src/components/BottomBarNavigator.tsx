import { TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

export default function BottomBarNavigator() {
  const { navigate } = useNavigation();

  return (
    <View className="flex-2 w-full px-5 pb-5 flex-row justify-between">
      <TouchableOpacity
        activeOpacity={0.7}
        className="p-4"
        onPress={() => navigate("home")}
      >
        <Feather name="home" size={28} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        className="p-4"
        onPress={() => navigate("search")}
      >
        <Feather name="search" size={28} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        className="p-4"
        onPress={() => navigate("cart")}
      >
        <Feather name="shopping-cart" size={28} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        className="p-4"
        onPress={() => navigate("profile")}
      >
        <Feather name="user" size={28} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}
