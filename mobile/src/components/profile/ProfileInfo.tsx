import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import formatBirthDate from "../../utils/formatBirthDate";
import formatCpf from "../../utils/formatCpf";
import colors from "tailwindcss/colors";
import Container from "../../components/Container";
import { Feather } from "@expo/vector-icons";
import useProfileInfo from "../../hooks/useProfileInfo";
import ConfirmModal from "../../components/modals/ConfirmModal";

export default function ProfileInfo() {
  const { user } = useAuth();
  const { handleRemoveAccount, isModalOpen, setIsModalOpen } = useProfileInfo();

  return (
    <>
      <ConfirmModal
        isVisible={isModalOpen}
        setIsVisible={setIsModalOpen}
        title="Deletar conta"
        message="Essa ação nao poderá ser desfeita"
        confirmText="Deletar"
        cancelText="Cancelar"
        handler={handleRemoveAccount}
        isDanger
      />
      <Container hasBack>
        <View className="flex-1 justify-between">
          <View className="flex gap-y-3">
            <View className="flex-row">
              <View className="h-full w-1 bg-violet-600 mr-4"></View>
              <Text className="text-white font-semibold text-base">
                Meus dados
              </Text>
            </View>
            <View className="justify-between">
              <Text className="text-zinc-500 font-semibold text-base">
                Nome completo:
              </Text>
              <Text className="text-white font-semibold text-base">
                {user?.name.toUpperCase()} {user?.surname.toUpperCase()}
              </Text>
            </View>
            <View className="justify-between">
              <Text className="text-zinc-500 font-semibold text-base">
                Data de nascimento:
              </Text>
              <Text className="text-white font-semibold text-base">
                {user?.birth && formatBirthDate(user.birth)}
              </Text>
            </View>
            <View className="justify-between">
              <Text className="text-zinc-500 font-semibold text-base">
                E-mail:
              </Text>
              <Text className="text-white font-semibold text-base">
                {user?.email}
              </Text>
            </View>
            <View className="justify-between">
              <Text className="text-zinc-500 font-semibold text-base">
                CPF:
              </Text>
              <Text className="text-white font-semibold text-base">
                {user?.cpf && formatCpf(user.cpf)}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            className="h-14 px-5 mb-4 flex-row items-center justify-center bg-zinc-900 rounded-md"
            onPress={() => setIsModalOpen(true)}
          >
            <Feather name="trash-2" size={24} color={colors.zinc[700]} />
            <Text className="text-zinc-700 font-semibold text-base pl-3">
              Deletar conta
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    </>
  );
}
