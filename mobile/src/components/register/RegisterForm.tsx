import { ScrollView, View } from "react-native";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { Form } from "../form";
import { RegisterType } from "./registerSchema";

interface RegisterFormProps {
  control: Control<RegisterType>;
  handleSubmit: UseFormHandleSubmit<RegisterType>;
  onSubmit: (data: any) => void;
  isLoading: boolean;
  errors: FieldErrors<RegisterType>;
}

export default function RegisterForm(props: RegisterFormProps) {
  const { control, handleSubmit, onSubmit, isLoading, errors } = props;

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
        <Form.ControlledDateInput
          title="Data de nascimento"
          name="birthDate"
          control={control}
          error={errors.birthDate}
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
          placeholder="000.000.000-00"
          control={control}
          error={errors.cpf}
        />
        <Form.ControlledInput
          title="CEP"
          name="zipCode"
          placeholder="00.000-000"
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
          text="Cadastrar"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
}
