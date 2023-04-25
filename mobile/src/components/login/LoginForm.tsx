import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { Form } from "../form";
import { LoginType } from "./loginSchema";
import { useState } from "react";
import ContentModal from "../modals/ContentModal";
import Register from "../profile/Register";

interface LoginFormProps {
  control: Control<LoginType>;
  handleSubmit: UseFormHandleSubmit<LoginType>;
  onSubmit: (data: any) => void;
  isLoading: boolean;
  errors: FieldErrors<LoginType>;
}

export default function LoginForm(props: LoginFormProps) {
  const { control, handleSubmit, onSubmit, isLoading, errors } = props;
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <>
      <ContentModal
        isVisible={isRegisterModalOpen}
        setIsVisible={setIsRegisterModalOpen}
      >
        <Register setIsModaPageOpen={setIsRegisterModalOpen} />
      </ContentModal>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 pb-32">
          <Form.ControlledInput
            title="E-mail"
            name="email"
            keyboardType="email-address"
            autoCapitalize="none"
            control={control}
            error={errors.email}
          />
          <Form.ControlledInput
            title="Senha"
            name="password"
            control={control}
            secureTextEntry
            error={errors.password}
          />
          <Form.SubmitButton
            text="Entrar"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsRegisterModalOpen(true)}
          >
            <Text className="text-base font-semibold text-white mt-2">
              Não possui uma conta?{" "}
              <Text className="text-violet-400 underline">Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
