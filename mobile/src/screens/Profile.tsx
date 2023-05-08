import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Container from "../components/Container";
import ConfirmModal from "../components/modals/ConfirmModal";

export interface ModalPageProps {
  setIsModalPageOpen: (state: boolean) => void;
}

export default function Profile() {
  const { user, Logout } = useAuth();
  const { navigate } = useNavigation();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleAskLogout = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsConfirmModalOpen(false);
    Logout();
  };

  const TransferButton = () => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleAskLogout}
      className="h-14 px-4 items-center justify-center bg-zinc-900 rounded-md"
    >
      <MaterialCommunityIcons
        name="exit-to-app"
        size={24}
        color={colors.zinc[700]}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <ConfirmModal
        isVisible={isConfirmModalOpen}
        setIsVisible={setIsConfirmModalOpen}
        title="Sair"
        message="Tem certeza que deseja sair?"
        confirmText="Confirmar"
        cancelText="Cancelar"
        handler={handleConfirmLogout}
        isDanger
      />
      <Container title={`Olá, ${user?.name}`} button={<TransferButton />}>
        <View className="flex-1">
          <View className="flex-row gap-x-2">
            <Text className="text-white text-base font-semibold">
              Seja bem-vindo novamente
            </Text>
            <Feather name="smile" size={24} color={colors.white} />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex flex-row bg-violet-600 p-4 rounded-md mt-3"
            onPress={() => navigate("profileInfo")}
          >
            <FontAwesome5 name="user-circle" size={24} color={colors.white} />
            <Text className="pl-3 text-white text-base font-semibold">
              Meus Dados
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex flex-row bg-violet-600 p-4 rounded-md mt-3"
            onPress={() => navigate("myTickets")}
          >
            <MaterialCommunityIcons
              name="ticket-confirmation-outline"
              size={24}
              color={colors.white}
            />
            <Text className="pl-3 text-white text-base font-semibold">
              Meus Ingressos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex flex-row bg-violet-600 p-4 rounded-md mt-3"
            onPress={() => navigate("who")}
          >
            <MaterialCommunityIcons
              name="office-building-outline"
              size={24}
              color={colors.white}
            />
            <Text className="pl-3 text-white text-base font-semibold">
              Quem Somos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex flex-row bg-violet-600 p-4 rounded-md mt-3"
            onPress={() => navigate("help")}
          >
            <MaterialCommunityIcons
              name="help-circle-outline"
              size={24}
              color={colors.white}
            />
            <Text className="pl-3 text-white text-base font-semibold">
              Obter Ajuda
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    </>
  );
}
