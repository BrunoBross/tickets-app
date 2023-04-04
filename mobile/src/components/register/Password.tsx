import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "tailwindcss/colors";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import RegisterBreadcrumb from "./RegisterBreadcrumb";
import { RegisterPageEnum, useRegister } from "../../contexts/RegisterContext";

export default function Password() {
  const { setValue, getValues, setPage, onSubmit } = useRegister();

  const isReadyToSubmit =
    getValues("password")?.length >= 8 &&
    getValues("confirmPassword")?.length >= 8;

  return (
    <View className="flex-1 p-5 gap-5">
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPage({ type: RegisterPageEnum.ADDRESS })}
        >
          <Ionicons name="arrow-back-outline" size={40} color="#a1a1aa" />
        </TouchableOpacity>
        <Text className="text-white mt-4 text-4xl font-extrabold tracking-widest">
          Cadastre-se
        </Text>
      </View>
      <View>
        <RegisterBreadcrumb isPassword canChange={isReadyToSubmit} />
      </View>
      <ScrollView>
        <View className="flex-1">
          <View className="flex gap-y-3">
            <TextInput
              selectionColor={colors.white}
              placeholderTextColor={colors.zinc[500]}
              placeholder="Senha"
              inputMode="text"
              secureTextEntry={true}
              className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
              value={getValues("password")}
              onChangeText={(value) => setValue("password", value)}
            />
            <TextInput
              selectionColor={colors.white}
              placeholderTextColor={colors.zinc[500]}
              placeholder="Confirmar Senha"
              inputMode="text"
              secureTextEntry={true}
              className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
              value={getValues("confirmPassword")}
              onChangeText={(value) => setValue("confirmPassword", value)}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!isReadyToSubmit}
            className={clsx(
              "flex p-3 h-14 mt-3 flex-row items-center justify-center rounded-md",
              {
                ["bg-green-600"]: isReadyToSubmit,
                ["bg-zinc-600"]: !isReadyToSubmit,
              }
            )}
            onPress={onSubmit}
          >
            <Text
              className={clsx(" text-base font-semibold", {
                ["text-white"]: isReadyToSubmit,
                ["text-zinc-400"]: !isReadyToSubmit,
              })}
            >
              Próximo
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
