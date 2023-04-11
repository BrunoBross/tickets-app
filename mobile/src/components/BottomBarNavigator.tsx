import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../contexts/CartContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import formatPrice from "../utils/formatPrice";

export default function BottomBarNavigator({
  state,
  descriptors,
  navigation,
}: any) {
  const { navigate } = useNavigation();
  const { cartList, cartTotalPrice } = useCart();

  const showCartButton = state.index !== 2 && cartList.length > 0;

  return (
    <View>
      {showCartButton && (
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-14 items-center absolute bottom-16"
          onPress={() => navigate("cartPage")}
        >
          <View className="flex-1 w-[90%] h-full bg-green-600 rounded-md flex-row items-center justify-between px-4">
            <Text className=" text-white font-semibold text-base">
              {formatPrice(cartTotalPrice)}
            </Text>

            <View className="flex-1 flex-row items-center justify-center gap-x-2 ">
              <Text className="text-white font-semibold text-base">
                Ir para o carrinho
              </Text>
              <Feather name="arrow-right" size={24} color={colors.white} />
            </View>
            <MaterialCommunityIcons
              name="cart-check"
              size={24}
              color={colors.white}
            />
          </View>
        </TouchableOpacity>
      )}
      <View className="flex-2 w-full px-5 flex-row justify-between">
        {state.routes.map((route: any, index: any) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const label = route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              className="px-4 py-1"
              onPress={onPress}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
            >
              {label === "homePage" && (
                <Feather
                  name="home"
                  size={28}
                  style={{
                    color: isFocused ? colors.white : colors.zinc[500],
                  }}
                />
              )}
              {label === "searchPage" && (
                <Feather
                  name="search"
                  size={28}
                  style={{
                    color: isFocused ? colors.white : colors.zinc[500],
                  }}
                />
              )}
              {label === "cartPage" && (
                <Feather
                  name="shopping-cart"
                  size={28}
                  style={{
                    color: isFocused ? colors.white : colors.zinc[500],
                  }}
                />
              )}
              {label === "profilePage" && (
                <Feather
                  name="user"
                  size={28}
                  style={{
                    color: isFocused ? colors.white : colors.zinc[500],
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
