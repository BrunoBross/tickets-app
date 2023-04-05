import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { RegisterPageEnum, useRegister } from "../../contexts/RegisterContext";

interface RegisterBreadcrumbProps {
  isAccount?: boolean;
  isAddress?: boolean;
  isPassword?: boolean;
  canChange?: boolean;
}

export default function RegisterBreadcrumb(props: RegisterBreadcrumbProps) {
  const { setPage, page, readyList } = useRegister();

  const { isAccount, isAddress, isPassword, canChange } = props;

  const handleChangePage = (pageName: RegisterPageEnum) => {
    if (readyList.includes(pageName)) {
      setPage({ type: pageName });
    }
  };

  return (
    <View className="flex-row justify-around bg-zinc-600 p-2 rounded-md">
      <TouchableOpacity
        onPress={() => handleChangePage(RegisterPageEnum.ACCOUNT)}
        activeOpacity={0.7}
      >
        <Text
          className={clsx("text-zinc-400 text-base font-semibold", {
            ["text-white"]: page.ACCOUNT,
          })}
        >
          Conta
        </Text>
      </TouchableOpacity>

      <MaterialIcons name="navigate-next" size={24} color={colors.zinc[400]} />

      <TouchableOpacity
        onPress={() => handleChangePage(RegisterPageEnum.ADDRESS)}
        activeOpacity={0.7}
      >
        <Text
          className={clsx("text-zinc-400 text-base font-semibold", {
            ["text-white"]: page.ADDRESS,
          })}
        >
          Endereço
        </Text>
      </TouchableOpacity>

      <MaterialIcons name="navigate-next" size={24} color={colors.zinc[400]} />

      <TouchableOpacity
        onPress={() => handleChangePage(RegisterPageEnum.PASSWORD)}
        activeOpacity={0.7}
      >
        <Text
          className={clsx("text-zinc-400 text-base font-semibold", {
            ["text-white"]: page.PASSWORD,
          })}
        >
          Senha
        </Text>
      </TouchableOpacity>
    </View>
  );
}
