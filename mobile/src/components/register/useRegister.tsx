import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import { RegisterType, registerSchema } from "./registerSchema";
import useApi from "../../lib/api";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function useRegister() {
  const { api } = useApi();
  const toast = useToast();
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const createRegisterForm: UseFormReturn<RegisterType> = useForm<RegisterType>(
    {
      resolver: zodResolver(registerSchema),
    }
  );

  const onSubmit: SubmitHandler<RegisterType> = async (data: RegisterType) => {
    setIsLoading(true);
    await api
      .post("/user", {
        name: data.name,
        surname: data.surname,
        email: data.email,
        cpf: data.cpf,
        birth: data.birthDate,
        password: data.password,
      })
      .then((response) => {
        navigate("login");
        toast.show(response.data.message, { type: "success" });
      })
      .catch((error) => {
        toast.show(error.response.data.error, { type: "danger" });
      });
    setIsLoading(false);
  };

  return { createRegisterForm, onSubmit, isLoading };
}
