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
  Login(): Promise<void>;
  Logout(): void;
}

const AuthContext = createContext({} as AuthContextInterface);

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [organizer, setOrganizer] = useState<OrganizerInterface | null>(null);

  // verifica em primeira instancia se há algum token carregado
  useEffect(() => {
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
      });
    }
  }, []);

  async function Login() {
    const response = await api.post("/organizer/auth", {
      email: "bbarreto18@gmail.com",
      password: "senha",
    });

    setOrganizer(response.data.organizer);
    api.defaults.headers.Authorization = `Bearer ${response.data.tokenId}`;
    localStorage.setItem("tokenId", response.data.tokenId);
  }

  async function Logout() {
    localStorage.removeItem("tokenId");
    setOrganizer(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(organizer), organizer, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
