import { Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../../contexts/CartContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import formatPrice from "../../utils/formatPrice";
import CartList from "../../components/cart/CartList";

export default function Cart() {
  const { user } = useAuth();
  const { cartList, clearCartList, handleBuyTickets, cartTotalPrice } =
    useCart();
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 bg-background p-5 gap-5">
      <View className="justify-center h-10">
        <Text className="text-white text-4xl font-extrabold tracking-widest">
          Carrinho
        </Text>
      </View>

      {user ? (
        <View className="flex-1">
          <CartList cartList={cartList} />

          {cartList && cartList.length > 0 && (
            <View className="w-full items-center absolute bottom-2">
              <View className="flex-1 w-full gap-y-2">
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="flex w-full flex-row bg-zinc-700 p-4 rounded-md"
                  onPress={clearCartList}
                >
                  <MaterialCommunityIcons
                    name="cart-remove"
                    size={24}
                    color={colors.white}
                  />
                  <Text className=" text-white text-base font-semibold pl-2">
                    Esvaziar carrinho
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="flex w-full flex-row bg-green-600 justify-between p-4 rounded-md"
                  onPress={handleBuyTickets}
                  disabled={!(cartList && cartList.length > 0)}
                >
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
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      ) : (
        <View className="flex flex-1">
          <Text className="text-white text-base font-semibold">
            Você precisa estar logado!
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            className="p-4 h-14 flex-row bg-violet-600 rounded-md mt-3"
            onPress={() => navigate("profilePage")}
          >
            <MaterialCommunityIcons
              name="login"
              size={24}
              color={colors.white}
            />
            <Text className="text-white pl-2 text-base font-semibold">
              Fazer login
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
