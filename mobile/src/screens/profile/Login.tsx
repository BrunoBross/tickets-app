import Container from "../../components/Container";
import LoginForm from "../../components/login/LoginForm";
import useLogin from "../../components/login/useLogin";

export default function Login() {
  const { createLoginForm, onSubmit, isLoading } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = createLoginForm;

  return (
    <Container title="Bem-vindo">
      <LoginForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isLoading={isLoading}
        errors={errors}
      />
    </Container>
  );
}
