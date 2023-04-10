import RegisterPage from "../../components/register/RegisterPage";
import RegisterProvider from "../../contexts/RegisterContext";

export default function Register() {
  return (
    <RegisterProvider>
      <RegisterPage />
    </RegisterProvider>
  );
}
