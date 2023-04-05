import { View } from "react-native";
import Account from "./Account";
import Password from "./Password";
import { useRegister } from "../../contexts/RegisterContext";
import Address from "./Address";

export default function RegisterPage() {
  const { page } = useRegister();

  return (
    <View className="flex-1 bg-background">
      {page.ACCOUNT && <Account />}
      {page.ADDRESS && <Address />}
      {page.PASSWORD && <Password />}
    </View>
  );
}
