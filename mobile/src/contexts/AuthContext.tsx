import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import ConfirmModal from "../components/ConfirmModal";

interface AuthProviderProps {
  children: ReactNode;
}

export interface UserInterface {
  id: string;
  name: string;
  surname: string;
  email: string;
  cpf: string;
  birth: Date;
  gender: string;
  address: string;
  zip_code: string;
}

export interface AuthContextInterface {
  signed: boolean;
  user: UserInterface | null;
  Login: (props: LoginProps) => Promise<void>;
  Logout: () => void;
  isLoading: boolean;
  error: string | null;
  setError: Dispatch<SetStateAction<null>>;
}

interface LoginProps {
  email: string;
  password: string;
}

const AuthContext = createContext({} as AuthContextInterface);

export default function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const verifyUserOnEnter = async () => {
    setIsLoading(true);
    const tokenId = await AsyncStorage.getItem("tokenId");

    const requestUser = async () => {
      const response = await api.get("/user/auth", {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });
      return response;
    };

    if (tokenId) {
      requestUser().then((response) => {
        setUser(response.data);
        setIsLoading(false);
        setError(null);
      });
    } else {
      setIsLoading(false);
      setError(null);
    }
  };

  // verifica em primeira instancia se há algum token carregado
  useEffect(() => {
    verifyUserOnEnter();
  }, []);

  async function Login(props: LoginProps) {
    const { email, password } = props;

    await api
      .post("/user/auth", {
        email,
        password,
      })
      .then(async (response) => {
        setUser(response.data.user);
        api.defaults.headers.Authorization = `Bearer ${response.data.tokenId}`;
        await AsyncStorage.setItem("tokenId", response.data.tokenId);
        setError(null);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }

  const Logout = async () => {
    await AsyncStorage.removeItem("tokenId");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        user,
        Login,
        Logout,
        isLoading,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
