import Container from "../../components/Container";
import RegisterForm from "../../components/register/RegisterForm";
import useRegister from "../../components/register/useRegister";
import { ModalPageProps } from "../../screens/Profile";

export default function Register(props: ModalPageProps) {
  const { setIsModalPageOpen } = props;
  const { createRegisterForm, onSubmit, isLoading } = useRegister();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = createRegisterForm;

  return (
    <Container
      title="Cadastro"
      hasBack
      onBack={() => setIsModalPageOpen(false)}
      askConfirm={isDirty}
      message="Tem certeza que deseja cancelar?"
      confirmText="Cancelar"
      cancelText="Não"
      isDanger
    >
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
