import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { RegisterPageEnum, useRegister } from "../../contexts/RegisterContext";

export default function RegisterBreadcrumb() {
  const { setPage, page, readyList } = useRegister();

  const handleChangePage = (
    permission: RegisterPageEnum,
    pageName: RegisterPageEnum
  ) => {
    if (readyList.includes(permission)) {
      setPage({ type: pageName });
    }
  };

  return (
    <View className="flex-row justify-around bg-zinc-600 p-2 rounded-md">
      <TouchableOpacity
        onPress={() =>
          handleChangePage(RegisterPageEnum.ACCOUNT, RegisterPageEnum.ACCOUNT)
        }
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
        onPress={() =>
          handleChangePage(RegisterPageEnum.ACCOUNT, RegisterPageEnum.ADDRESS)
        }
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
        onPress={() =>
          handleChangePage(RegisterPageEnum.ADDRESS, RegisterPageEnum.PASSWORD)
        }
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
