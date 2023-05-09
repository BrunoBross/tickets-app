import { TouchableOpacity } from "react-native-gesture-handler";
import Container from "../../components/Container";
import RegisterForm from "../../components/register/RegisterForm";
import useRegister from "../../components/register/useRegister";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import ConfirmModal from "../modals/ConfirmModal";
import { useState } from "react";

const infoMessage =
  "Os dados pessoais cadastrados serão os mesmos dados a serem utilizados na entrada do evento, isso significa que não deve haver nenhuma divergência";

export default function Register() {
  const { createRegisterForm, onSubmit, isLoading } = useRegister();
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = createRegisterForm;

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
      <Container
        title="Cadastro"
        hasBack
        askConfirm={isDirty}
        message="Tem certeza que deseja cancelar?"
        confirmText="Cancelar"
        cancelText="Não"
        isDanger
        button={<InfoButton />}
      >
        <RegisterForm
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isLoading={isLoading}
          errors={errors}
        />
      </Container>
    </>
  );
}
