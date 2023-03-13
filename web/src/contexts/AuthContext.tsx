import { AxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface OrganizerInterface {
  name: string;
  surname: string;
  cnpj: string | null;
  cpf: string | null;
  email: string;
}

export interface AuthContextInterface {
  signed: boolean;
  organizer: OrganizerInterface | null;
  Login: (email: string, password: string) => Promise<void>;
  Logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext({} as AuthContextInterface);

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [organizer, setOrganizer] = useState<OrganizerInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // verifica em primeira instancia se há algum token carregado
  useEffect(() => {
    setIsLoading(true);
    const tokenId = localStorage.getItem("tokenId");

    const requestOrganizer = async () => {
      const response = await api.get("/organizer/auth", {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });
      return response;
    };

    if (tokenId) {
      requestOrganizer().then((response) => {
        setOrganizer(response.data);
        setIsLoading(false);
        setError(null);
      });
    } else {
      setIsLoading(false);
      setError(null);
    }
  }, []);

  async function Login(email: string, password: string) {
    await api
      .post("/organizer/auth", {
        email,
        password,
      })
      .then((response) => {
        setOrganizer(response.data.organizer);
        api.defaults.headers.Authorization = `Bearer ${response.data.tokenId}`;
        localStorage.setItem("tokenId", response.data.tokenId);
        setError(null);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }

  async function Logout() {
    localStorage.removeItem("tokenId");
    setOrganizer(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(organizer),
        organizer,
        Login,
        Logout,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
