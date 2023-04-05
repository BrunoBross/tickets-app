import {
  Platform,
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
import RegisterBreadcrumb from "./RegisterBreadcrumb";
import { useNavigation } from "@react-navigation/native";
import { RegisterPageEnum, useRegister } from "../../contexts/RegisterContext";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Account() {
  const { goBack } = useNavigation();
  const {
    setValue,
    getValues,
    setPage,
    readyList,
    cpf,
    setCpf,
    birthDate,
    setBirthDate,
  } = useRegister();

  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const isReadyToNext = readyList.includes(RegisterPageEnum.ACCOUNT);

  const formattedBirthDate = birthDate?.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const today = new Date();
  const maximumDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const handleChangeBirthDate = (event: any, selectedDate?: Date) => {
    setDatePickerOpen(Platform.OS === "ios");
    if (selectedDate) {
      setBirthDate(selectedDate);
      console.log(selectedDate);
    }
  };

  return (
    <View className="flex-1 p-5 gap-5">
      <View>
        <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
          <Ionicons name="arrow-back-outline" size={40} color="#a1a1aa" />
        </TouchableOpacity>
        <Text className="text-white mt-4 text-4xl font-extrabold tracking-widest">
          Cadastre-se
        </Text>
      </View>
      <View>
        <RegisterBreadcrumb />
      </View>
      <ScrollView>
        <View className="flex-1 mb-32">
          <View className="flex-1 gap-y-3">
            <TextInput
              selectionColor={colors.white}
              placeholderTextColor={colors.zinc[500]}
              placeholder="Nome"
              inputMode="text"
              className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
              value={getValues("name")}
              onChangeText={(value) => setValue("name", value)}
            />
            <TextInput
              selectionColor={colors.white}
              placeholderTextColor={colors.zinc[500]}
              placeholder="Sobrenome"
              inputMode="text"
              className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
              value={getValues("surname")}
              onChangeText={(value) => setValue("surname", value)}
            />
            <TextInput
              selectionColor={colors.white}
              placeholderTextColor={colors.zinc[500]}
              placeholder="Email"
              inputMode="email"
              className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
              value={getValues("email")}
              onChangeText={(value) => setValue("email", value)}
            />
            <TextInput
              selectionColor={colors.white}
              placeholderTextColor={colors.zinc[500]}
              placeholder="Confirmar Email"
              inputMode="email"
              className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
              value={getValues("confirmEmail")}
              onChangeText={(value) => setValue("confirmEmail", value)}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row  bg-zinc-900 border-2 border-zinc-800 p-3 rounded-md"
              onPress={() => setDatePickerOpen(true)}
            >
              {birthDate ? (
                <Text className="text-white text-lg">{formattedBirthDate}</Text>
              ) : (
                <Text className="text-zinc-500 text-lg">
                  Data de Nascimento
                </Text>
              )}
            </TouchableOpacity>
            {datePickerOpen && (
              <DateTimePicker
                value={birthDate ? birthDate : new Date()}
                mode="date"
                dateFormat="day month year"
                display="default"
                maximumDate={maximumDate}
                onChange={handleChangeBirthDate}
              />
            )}

            <MaskInput
              selectionColor={colors.white}
              placeholderTextColor={colors.zinc[500]}
              value={cpf}
              placeholder="CPF"
              inputMode="numeric"
              mask={Masks.BRL_CPF}
              maxLength={14}
              className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
              onChangeText={setCpf}
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
            onPress={() => setPage({ type: RegisterPageEnum.ADDRESS })}
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
