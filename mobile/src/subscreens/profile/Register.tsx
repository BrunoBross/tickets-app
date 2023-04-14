import Container from "../../components/Container";
import RegisterForm from "../../components/register/RegisterForm";
import useRegister from "../../components/register/useRegister";

export default function Register() {
  const { createRegisterForm, onSubmit, isLoading } = useRegister();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = createRegisterForm;

  return (
    <Container title="Cadastro" hasBack>
      <RegisterForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isLoading={isLoading}
        errors={errors}
      />
    </Container>
  );
}
