import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "tailwindcss/colors";
import { useAuth } from "../../contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

const loginUserSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: "O e-mail é obrigatório",
    })
    .email({
      message: "Formato de e-mail inválido",
    })
    .toLowerCase(),
  password: z
    .string()
    .nonempty({
      message: "A senha é obrigatória",
    })
    .min(8, {
      message: "A senha precisa ter no mínimo 8 caracteres",
    }),
});

type LoginUserType = z.infer<typeof loginUserSchema>;

export default function Login() {
  const { Login, isLoading, error } = useAuth();
  const { navigate } = useNavigation();
  const createLoginForm = useForm<LoginUserType>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = createLoginForm;

  const handleInputChange = (name: any, value: string) => {
    setValue(name, value);
    trigger(name);
  };

  const onSubmit = async (data: LoginUserType) => {
    await Login({ email: data.email, password: data.password });
  };

  return (
    <View className="flex-1 bg-background p-5 pb-0 gap-5">
      <View className="justify-center h-14">
        <Text className="text-white text-4xl font-extrabold tracking-widest">
          Bem-vindo
        </Text>
      </View>
      <View className="flex-1 justify-center">
        <ScrollView>
          <View className="flex gap-3 mb-32">
            <Text className="text-base text-white font-semibold">
              Faça seu login
            </Text>
            <KeyboardAvoidingView behavior="position" enabled>
              <View>
                <TextInput
                  selectionColor={colors.white}
                  placeholderTextColor={colors.zinc[500]}
                  placeholder="Email"
                  inputMode="email"
                  className={clsx(
                    "h-14 p-3 text-base text-white bg-zinc-900 border-zinc-800 border-2 rounded-md",
                    {
                      ["focus:border-green-600 "]: !errors.email?.message,
                      ["focus:border-red-600"]: errors.email?.message,
                    }
                  )}
                  onChangeText={(email) => handleInputChange("email", email)}
                />
                {errors.email?.message && (
                  <Text className="text-red-600 font-semibold text-base mt-2">
                    {errors.email.message}
                  </Text>
                )}
              </View>

              <View>
                <TextInput
                  selectionColor={colors.white}
                  placeholderTextColor={colors.zinc[500]}
                  placeholder="Senha"
                  inputMode="text"
                  secureTextEntry={true}
                  className={clsx(
                    "h-14 p-3 text-base text-white bg-zinc-900 border-zinc-800 border-2 rounded-md",
                    {
                      ["focus:border-green-600"]: !errors.password?.message,
                      ["focus:border-red-600"]: errors.password?.message,
                    }
                  )}
                  onChangeText={(password) =>
                    handleInputChange("password", password)
                  }
                />
                {errors.password?.message && (
                  <Text className="text-red-600 font-semibold text-base mt-2">
                    {errors.password.message}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}
                className="flex p-3 h-14 flex-row items-center justify-center bg-green-600 rounded-md"
              >
                {isLoading ? (
                  <ActivityIndicator size="large" color={colors.white} />
                ) : (
                  <Text className="text-white text-base font-semibold">
                    Entrar
                  </Text>
                )}
              </TouchableOpacity>
              {error && (
                <View className="h-14 flex-row bg-red-600 justify-center items-center rounded-md">
                  <Feather
                    name="alert-triangle"
                    size={24}
                    color={colors.white}
                  />
                  <Text className="text-white text-base font-semibold pl-4">
                    {error}
                  </Text>
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
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
