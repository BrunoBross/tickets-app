import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "tailwindcss/colors";
import { useAuth } from "../contexts/AuthContext";
import { Feather } from "@expo/vector-icons";

export default function Login() {
  const { Login, isLoading, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { navigate } = useNavigation();

  const handleUserLogin = async () => {
    if (!email || !password) {
      return setError("Insira seu email e senha para logar!");
    }

    if (password.length < 8) {
      return setError("Senha menor que 8 caracteres!");
    }
    await Login({ email, password });
  };

  return (
    <View className="flex-1 bg-background p-5 gap-5">
      <Text className="text-white text-4xl font-extrabold tracking-widest">
        Bem-vindo
      </Text>
      <View className="flex-1 justify-center">
        <View className="flex gap-3">
          <Text className="text-base text-white font-semibold">
            Faça seu login
          </Text>
          <TextInput
            selectionColor={colors.white}
            placeholderTextColor={colors.zinc[500]}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            inputMode="email"
            className="h-14 p-3 text-base text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
          />
          <TextInput
            selectionColor={colors.white}
            placeholderTextColor={colors.zinc[500]}
            value={password}
            onChangeText={setPassword}
            placeholder="Senha"
            inputMode="text"
            secureTextEntry={true}
            className="h-14 p-3 text-base text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleUserLogin}
            className="flex p-3 h-14 flex-row items-center justify-center bg-green-600 rounded-md"
          >
            {isLoading ? (
              <ActivityIndicator size="large" color={colors.violet[600]} />
            ) : (
              <Text className="text-white text-base font-semibold">Entrar</Text>
            )}
          </TouchableOpacity>
          {error && (
            <View className="p-3 h-14 flex-row bg-red-600 border-2 border-red-500 justify-center items-center rounded-md">
              <Feather name="alert-triangle" size={24} color={colors.white} />
              <Text className="text-white text-base pl-4">{error}</Text>
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigate("register")}
          >
            <Text className="text-base font-semibold text-white">
              Não possui uma conta?{" "}
              <Text className="text-violet-400 underline">Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
