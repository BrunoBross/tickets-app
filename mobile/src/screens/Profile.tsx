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
import ContentModal from "../components/modals/ContentModal";
import MyTickets from "../components/profile/MyTickets";
import Who from "../components/profile/Who";
import Help from "../components/profile/Help";

export interface ModalPageProps {
  setIsModalPageOpen: (state: boolean) => void;
}

export default function Profile() {
  const { user, Logout } = useAuth();
  const { navigate } = useNavigation();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleLogout = () => {
    setIsConfirmModalOpen(true);
  };

  return (
    <>
      <ConfirmModal
        isVisible={isConfirmModalOpen}
        setIsVisible={setIsConfirmModalOpen}
        title="Sair"
        message="Tem certeza que deseja sair?"
        confirmText="Confirmar"
        cancelText="Cancelar"
        handler={Logout}
        isDanger
      />
      <Container title={`Olá, ${user?.name}`}>
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
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleLogout}
            className="flex flex-row bg-zinc-700 p-4 rounded-md mt-3"
          >
            <MaterialCommunityIcons
              name="exit-to-app"
              size={24}
              color={colors.white}
            />
            <Text className="pl-3 text-white text-base font-semibold">
              Sair
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    </>
  );
}
