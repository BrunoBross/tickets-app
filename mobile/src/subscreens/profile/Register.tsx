import { ScrollView } from "react-native";
import Container from "../../components/Container";
import RegisterForm from "../../components/register/RegisterForm";
import useRegister from "../../components/register/useRegister";

export default function Register() {
  const { createRegisterForm, onSubmit } = useRegister();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = createRegisterForm;

  return (
    <Container title="Registrar">
      <RegisterForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
    </Container>
  );
}
