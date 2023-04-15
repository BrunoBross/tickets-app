import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import ConfirmModal from "../components/modals/ConfirmModal";

export default function Profile() {
  const { user, Logout } = useAuth();
  const { navigate } = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <ConfirmModal
        isOpen={isModalOpen}
        title="Sair"
        handler={Logout}
        cancelHandler={() => setIsModalOpen(false)}
        confirmText="Confirmar"
        cancelText="Cancelar"
      >
        <Text className="text-white text-base font-semibold">
          Tem certeza que deseja sair?
        </Text>
      </ConfirmModal>

      <View className="flex-1 bg-background p-5 pb-0 gap-5">
        <View className="justify-center h-14">
          <Text className="text-white text-4xl font-extrabold tracking-widest">
            Olá, {user?.name}
          </Text>
        </View>
        <View>
          <Text className="text-white text-base font-semibold">
            Seja bem-vindo novamente
          </Text>
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
            onPress={() => navigate("mytickets")}
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
      </View>
    </>
  );
}