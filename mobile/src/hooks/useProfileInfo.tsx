import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import useApi from "../lib/api";

export default function useProfileInfo() {
  const api = useApi();
  const { Logout, user } = useAuth();
  const { navigate } = useNavigation();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemoveAccount = async () => {
    console.log(user?.id);

    await api.delete(`/user/deleteById/${user?.id}`);

    navigate("profile");
    Logout();
    setIsModalOpen(false);
    toast.show("Conta deletada com sucesso", { type: "success" });
  };

  return { handleRemoveAccount, isModalOpen, setIsModalOpen };
}
