import { Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../../contexts/CartContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import CartList from "../../components/cart/CartList";

export default function Cart() {
  const { user } = useAuth();
  const { cartList } = useCart();
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 bg-background p-5 pb-0 gap-5">
      <View className="justify-center h-14">
        <Text className="text-white text-4xl font-extrabold tracking-widest">
          Carrinho
        </Text>
      </View>

      {user ? (
        <View className="flex-1">
          <CartList cartList={cartList} />
        </View>
      ) : (
        <View className="flex flex-1">
          <Text className="text-white text-base font-semibold">
            Você precisa estar logado
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
