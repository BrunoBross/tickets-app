import { View } from "react-native";
import Account from "../components/register/Account";
import Info from "../components/register/Info";
import Password from "../components/register/Password";
import { useRegister } from "../contexts/RegisterContext";

export default function Register() {
  const { page } = useRegister();

  return (
    <View className="flex-1 bg-background">
      {page.account && <Account />}
      {page.address && <Info />}
      {page.password && <Password />}
    </View>
  );
}
