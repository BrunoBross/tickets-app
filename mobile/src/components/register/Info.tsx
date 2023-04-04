import { Dispatch, useState } from "react";
import {
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";
import colors from "tailwindcss/colors";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";

interface InfoProps {
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  dispatch: Dispatch<any>;
}

export default function Info(props: InfoProps) {
  const { setValue, getValues, dispatch } = props;
  const [cep, setCep] = useState("");

  const isReadyToNext =
    getValues("address") && getValues("addressNumber") && cep;

  return (
    <View className="flex-1 p-5 gap-5">
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => dispatch({ type: "account" })}
        >
          <Ionicons name="arrow-back-outline" size={40} color="#a1a1aa" />
        </TouchableOpacity>
        <Text className="text-white mt-4 text-4xl font-extrabold tracking-widest">
          Cadastre-se
        </Text>
      </View>
      <ScrollView>
        <View className="flex-1">
          <View className="flex gap-y-3">
            <MaskInput
              selectionColor={colors.white}
              placeholderTextColor={colors.zinc[500]}
              value={cep}
              placeholder="CEP"
              inputMode="numeric"
              mask={Masks.ZIP_CODE}
              onChangeText={setCep}
              maxLength={9}
              className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
            />
            <TextInput
              selectionColor={colors.white}
              placeholderTextColor={colors.zinc[500]}
              placeholder="Endereço"
              inputMode="text"
              className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
              value={getValues("address")}
              onChangeText={(value) => setValue("address", value)}
            />
            <TextInput
              selectionColor={colors.white}
              placeholderTextColor={colors.zinc[500]}
              placeholder="Número"
              inputMode="numeric"
              className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
              value={getValues("addressNumber")}
              onChangeText={(value) => setValue("addressNumber", value)}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!isReadyToNext}
            className={clsx(
              "flex p-3 h-14 mt-3 flex-row items-center justify-center rounded-md",
              {
                ["bg-green-600"]: isReadyToNext,
                ["bg-zinc-600"]: !isReadyToNext,
              }
            )}
            onPress={() => dispatch({ type: "password" })}
          >
            <Text
              className={clsx(" text-base font-semibold", {
                ["text-white"]: isReadyToNext,
                ["text-zinc-400"]: !isReadyToNext,
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
