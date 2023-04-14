import { ScrollView, View } from "react-native";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
} from "react-hook-form";
import { RegisterUserType } from "./useRegister";
import { Form } from "../form";

interface RegisterFormProps {
  control: Control<RegisterUserType>;
  handleSubmit: UseFormHandleSubmit<RegisterUserType>;
  onSubmit: (data: any) => void;
  errors: FieldErrors<RegisterUserType>;
}

export default function RegisterForm(props: RegisterFormProps) {
  const { control, handleSubmit, onSubmit, errors } = props;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-1 pb-32">
        <Form.ControlledInput
          title="Nome"
          name="name"
          control={control}
          error={errors.name}
        />
        <Form.ControlledInput
          title="Sobrenome"
          name="surname"
          control={control}
          error={errors.surname}
        />
        <Form.ControlledInput
          title="Email"
          name="email"
          control={control}
          error={errors.email}
        />
        <Form.ControlledInput
          title="Confirme o email"
          name="confirmEmail"
          control={control}
          error={errors.confirmEmail}
        />
        <Form.ControlledInput
          title="CPF"
          name="cpf"
          control={control}
          error={errors.cpf}
        />
        <Form.ControlledInput
          title="CEP"
          name="zipCode"
          control={control}
          error={errors.zipCode}
        />
        <Form.ControlledInput
          title="Endereço"
          name="address"
          control={control}
          error={errors.address}
        />
        <Form.ControlledInput
          title="Número"
          name="addressNumber"
          control={control}
          error={errors.addressNumber}
        />
        <Form.ControlledInput
          title="Senha"
          name="password"
          control={control}
          secureTextEntry
          error={errors.password}
        />
        <Form.ControlledInput
          title="Confirme a senha"
          name="confirmPassword"
          control={control}
          secureTextEntry
          error={errors.confirmPassword}
        />
        <Form.SubmitButton
          text="Registrar-se"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  );
}
