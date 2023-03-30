import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "tailwindcss/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MaskInput, { Masks } from "react-native-mask-input";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Register() {
  const { goBack } = useNavigation();
  const [cep, setCep] = useState("");
  const [cpf, setCpf] = useState("");

  return (
    <View className="flex-1 bg-background p-5 gap-5">
      <View>
        <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
          <Ionicons name="arrow-back-outline" size={40} color="#a1a1aa" />
        </TouchableOpacity>
        <Text className="text-white mt-4 text-4xl font-extrabold tracking-widest">
          Cadastre-se
        </Text>
      </View>
      <View className="flex-1 justify-center">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex gap-3 mb-32">
            <TextInput
              selectionColor={colors.white}
              placeholderTextColor={colors.zinc[500]}
              placeholder="Nome"
              inputMode="text"
              className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
            />
            <TextInput
              selectionColor={colors.white}
              placeholderTextColor={colors.zinc[500]}
              placeholder="Sobrenome"
              inputMode="text"
              className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
            />
            <TextInput
              selectionColor={colors.white}
              placeholderTextColor={colors.zinc[500]}
              placeholder="Email"
              inputMode="email"
              className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
            />
            <MaskInput
              selectionColor={colors.white}
              placeholderTextColor={colors.zinc[500]}
              value={cpf}
              placeholder="CPF"
              inputMode="numeric"
              onChangeText={setCpf}
              mask={Masks.BRL_CPF}
              maxLength={14}
              className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
            />
            <View className="flex flex-row">
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex-1 mr-1 h-14 flex-row items-center justify-center bg-blue-400 rounded-md"
              >
                <MaterialCommunityIcons
                  name="gender-male"
                  size={24}
                  color={colors.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex-1 ml-1 h-14 flex-row items-center justify-center bg-pink-400 rounded-md"
              >
                <MaterialCommunityIcons
                  name="gender-female"
                  size={24}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              selectionColor={colors.white}
              placeholderTextColor={colors.zinc[500]}
              placeholder="Endereço"
              inputMode="text"
              className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
            />
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
              placeholder="Senha"
              inputMode="text"
              secureTextEntry={true}
              className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
            />
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex p-3 h-14 flex-row items-center justify-center bg-green-600 rounded-md"
            >
              <Text className="text-white text-lg">Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
