import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { Login, error, setError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { navigate } = useNavigation();

  const handleUserLogin = async () => {
    if (!email || !password) {
      return console.log("email/senha nao preenchidos");
    }

    if (password.length < 8) {
      return console.log("senha menor que 8 chars");
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
          <Text className="text-lg text-white">Faça seu login</Text>
          <TextInput
            selectionColor={colors.white}
            placeholderTextColor={colors.zinc[700]}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            inputMode="email"
            className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md"
          />
          <TextInput
            selectionColor={colors.white}
            placeholderTextColor={colors.zinc[700]}
            value={password}
            onChangeText={setPassword}
            placeholder="Senha"
            inputMode="text"
            secureTextEntry={true}
            className="h-14 p-3 text-lg text-white bg-zinc-900 border-2 border-zinc-800 rounded-md"
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleUserLogin}
            className="flex p-3 h-14 flex-row items-center justify-center bg-green-600 rounded-md"
          >
            <Text className="text-white text-lg">Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigate("register")}
          >
            <Text className="text-lg text-white">
              Não possui uma conta?{" "}
              <Text className="text-violet-400 underline">Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
