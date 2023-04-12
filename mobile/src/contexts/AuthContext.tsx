import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useApi from "../lib/api";

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
  setError: Dispatch<SetStateAction<string | null>>;
}

interface LoginProps {
  email: string;
  password: string;
}

const AuthContext = createContext({} as AuthContextInterface);

export default function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const api = useApi();
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      requestUser()
        .then((response) => {
          setUser(response.data);
          setIsLoading(false);
          setError(null);
        })
        .catch(async () => {
          api.defaults.headers.Authorization = "";
          await AsyncStorage.removeItem("tokenId");
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

    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.error);
        setIsLoading(false);
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
