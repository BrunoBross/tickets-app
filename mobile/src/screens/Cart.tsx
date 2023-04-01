import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../contexts/CartContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import CartItem from "../components/CartItem";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function Cart() {
  const { user } = useAuth();
  const { cartList, clearCartList, handleBuyTickets } = useCart();
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 bg-background p-5 gap-5">
      <Text className="text-white text-4xl font-extrabold tracking-widest">
        Carrinho
      </Text>
      {user ? (
        <View className="flex flex-1 justify-between">
          <ScrollView showsVerticalScrollIndicator={false} className="h-full">
            <View className="pb-32">
              {cartList.length > 0 ? (
                cartList.map((event) => {
                  return <CartItem key={event.id} event={event} />;
                })
              ) : (
                <Text className="text-white text-base font-semibold">
                  Seu carrinho está vazio
                </Text>
              )}
            </View>
          </ScrollView>
          {cartList && cartList.length > 0 && (
            <View className="gap-y-1 pt-2">
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex flex-row bg-green-600 p-4 rounded-md"
                onPress={handleBuyTickets}
                disabled={!(cartList && cartList.length > 0)}
              >
                <MaterialCommunityIcons
                  name="cart-arrow-down"
                  size={24}
                  color={colors.white}
                />
                <Text className=" text-white text-base font-semibold pl-2">
                  Finalizar compra
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex flex-row bg-zinc-700 p-4 rounded-md"
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
