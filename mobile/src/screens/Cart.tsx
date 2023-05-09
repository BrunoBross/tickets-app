import { Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../contexts/CartContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useAuth } from "../contexts/AuthContext";
import CartList from "../components/cart/CartList";
import Container from "../components/Container";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import ConfirmModal from "../components/modals/ConfirmModal";

const infoMessage =
  "Todos os ingressos adquiridos serão depositados em sua conta, mas é possível transferi-los para outra pessoa após a compra";

export default function Cart() {
  const { user } = useAuth();
  const { cartList } = useCart();
  const { navigate } = useNavigation();
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);

  const InfoButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        className="p-4 rounded-full"
        onPress={() => setIsModalInfoOpen(true)}
      >
        <MaterialCommunityIcons
          name="information-outline"
          size={24}
          color={colors.white}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ConfirmModal
        isVisible={isModalInfoOpen}
        setIsVisible={setIsModalInfoOpen}
        title="Importante"
        message={infoMessage}
        confirmText="Entendi"
        handler={() => setIsModalInfoOpen(false)}
      />
      <Container title="Carrinho" button={<InfoButton />}>
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
              onPress={() => navigate("login")}
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
      </Container>
    </>
  );
}
