import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../../contexts/CartContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import formatPrice from "../../utils/formatPrice";
import FloatingButton from "./FloatingButton";

export default function BottomBarNavigator({
  state,
  descriptors,
  navigation,
}: any) {
  const { navigate } = useNavigation();
  const { cartList, cartTotalPrice, clearCartList, handleBuyTickets } =
    useCart();

  const showCartButton = state.index !== 2 && cartList.length > 0;

  return (
    <View className="items-center">
      {showCartButton && (
        <FloatingButton handler={() => navigate("cartPage")}>
          <View className="flex-1 w-[93%] h-full bg-green-600 rounded-md flex-row items-center justify-between px-4">
            <View className="flex flex-row">
              <MaterialCommunityIcons
                name="cart-arrow-down"
                size={24}
                color={colors.white}
              />
              <Text className=" text-white text-base font-semibold pl-2">
                Ir para o carrinho
              </Text>
            </View>
            <Text className=" text-white text-base font-semibold pl-2">
              {formatPrice(cartTotalPrice)}
            </Text>
          </View>
        </FloatingButton>
      )}
      {!showCartButton && cartList.length > 0 && (
        <>
          <FloatingButton handler={handleBuyTickets}>
            <View className="flex-1 w-[93%] h-full bg-green-600 rounded-md flex-row items-center justify-between px-4">
              <View className="flex flex-row">
                <MaterialCommunityIcons
                  name="cart-arrow-down"
                  size={24}
                  color={colors.white}
                />
                <Text className=" text-white text-base font-semibold pl-2">
                  Finalizar compra
                </Text>
              </View>
              <Text className=" text-white text-base font-semibold pl-2">
                {formatPrice(cartTotalPrice)}
              </Text>
            </View>
          </FloatingButton>
          <FloatingButton handler={clearCartList} upper>
            <View className="flex-1 w-[93%] h-full bg-zinc-700 rounded-md flex-row items-center px-4">
              <MaterialCommunityIcons
                name="cart-remove"
                size={24}
                color={colors.white}
              />
              <Text className=" text-white text-base font-semibold pl-2">
                Esvaziar carrinho
              </Text>
            </View>
          </FloatingButton>
        </>
      )}
      <View className="flex-2 w-full border-t-2 gap-x-2 border-zinc-900 flex-row">
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
              className="flex-1 items-center justify-center p-4"
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
