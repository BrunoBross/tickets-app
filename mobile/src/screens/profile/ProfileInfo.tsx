import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import formatBirthDate from "../../utils/formatBirthDate";
import formatCpf from "../../utils/formatCpf";
import colors from "tailwindcss/colors";
import { FontAwesome } from "@expo/vector-icons";
import Container from "../../components/Container";
import { Feather } from "@expo/vector-icons";
import useProfileInfo from "../../hooks/useProfileInfo";
import NewConfirmModal from "../../components/modals/ConfirmModal";

export default function ProfileInfo() {
  const { user } = useAuth();
  const { handleRemoveAccount, isModalOpen, setIsModalOpen } = useProfileInfo();

  return (
    <>
      <NewConfirmModal
        isVisible={isModalOpen}
        setIsVisible={setIsModalOpen}
        title="Deletar conta"
        message="Essa ação nao poderá ser desfeita"
        confirmText="Deletar"
        cancelText="Cancelar"
        handler={handleRemoveAccount}
        isDanger
      />
      <Container
        hasBack
        button={
          <TouchableOpacity
            activeOpacity={0.7}
            className="h-12 px-5 flex-row items-center justify-center border-2 border-violet-600 rounded-md"
            onPress={() => setIsModalOpen(true)}
          >
            <Feather name="trash-2" size={24} color={colors.white} />
            <Text className="text-white pl-2 text-base font-semibold">
              Deletar conta
            </Text>
          </TouchableOpacity>
        }
      >
        <TouchableOpacity activeOpacity={0.7} className="items-center">
          <FontAwesome name="user-circle-o" size={90} color={colors.white} />
        </TouchableOpacity>
        <View className="flex gap-y-3 mt-5">
          <View className="flex-row">
            <View className="h-full w-1 bg-violet-600 mr-4"></View>
            <Text className="text-white font-semibold text-base">
              Meus dados
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-zinc-500 font-semibold text-base">
              Nome completo
            </Text>
            <Text className="text-white font-semibold text-base">
              {user?.name.toUpperCase()} {user?.surname.toUpperCase()}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-zinc-500 font-semibold text-base">
              Data nascimento
            </Text>
            <Text className="text-white font-semibold text-base">
              {user?.birth && formatBirthDate(user.birth)}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-zinc-500 font-semibold text-base">
              E-mail
            </Text>
            <Text className="text-white font-semibold text-base">
              {user?.email}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-zinc-500 font-semibold text-base">CPF</Text>
            <Text className="text-white font-semibold text-base">
              {user?.cpf && formatCpf(user.cpf)}
            </Text>
          </View>
        </View>
      </Container>
    </>
  );
}