import { ReactNode, createContext, useContext, useState } from "react";
import { API_URL } from "@env";
import { AxiosInstance } from "axios";

interface ConnectionProviderProps {
  children: ReactNode;
}

interface ConnectionContextInterface {
  serverIp: string;
  testConnection: (api: AxiosInstance) => void;
  isLoading: boolean;
  isServerOn: boolean;
}

const ConnectionContext = createContext({} as ConnectionContextInterface);

export default function ConnectionProvider(props: ConnectionProviderProps) {
  const { children } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isServerOn, setIsServerOn] = useState(false);

  const testConnection = async (api: AxiosInstance) => {
    setIsLoading(true);
    await api
      .get("/connection")
      .then((response: any) => {
        if (response.status == 200) {
          setIsServerOn(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <ConnectionContext.Provider
      value={{ serverIp: API_URL, testConnection, isLoading, isServerOn }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export const useConnection = () => useContext(ConnectionContext);
