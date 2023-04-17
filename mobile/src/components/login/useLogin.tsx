import { LoginType, loginSchema } from "./loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../contexts/AuthContext";

export default function useLogin() {
  const { Login, isLoading } = useAuth();

  const createLoginForm = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginType) => {
    await Login({ email: data.email, password: data.password }).catch(
      (error) => {
        console.log(error);
      }
    );
  };

  return { createLoginForm, onSubmit, isLoading };
}
