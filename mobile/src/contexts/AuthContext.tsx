import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../lib/api";

interface AuthProviderProps {
  children: React.ReactNode;
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
  const [tokenId, setTokenId] = useState<string>();

  // verifica em primeira instancia se há algum token carregado
  useEffect(() => {
    setIsLoading(true);

    const getTokenId = async () => {
      const tokenStoragedId = await AsyncStorage.getItem("tokenId");
      tokenStoragedId && setTokenId(tokenStoragedId);
    };

    getTokenId();

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

  async function Logout() {
    await AsyncStorage.removeItem("tokenId");
    setUser(null);
  }

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
