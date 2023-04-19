import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AxiosInstance } from "axios";
import useApi from "../lib/api";
import { ActivityIndicator, View } from "react-native";
import colors from "tailwindcss/colors";
import UnableConnection from "../components/UnableConnection";

interface ConnectionProviderProps {
  children: ReactNode;
}

interface ConnectionContextInterface {
  testConnection: (api: AxiosInstance) => void;
  isLoading: boolean;
  isServerOn: boolean;
}

const ConnectionContext = createContext({} as ConnectionContextInterface);

export default function ConnectionProvider(props: ConnectionProviderProps) {
  const { children } = props;
  const { api } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [isServerOn, setIsServerOn] = useState(false);

  useEffect(() => {
    testConnection(api);
  }, []);

  const testConnection = async (api: AxiosInstance) => {
    setIsLoading(true);
    await api
      .get("connection")
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

  if (isLoading) {
    return (
      <View className="flex-1 w-full h-full items-center justify-center bg-background">
        <ActivityIndicator size="large" color={colors.violet[600]} />
      </View>
    );
  }

  if (!isServerOn) {
    return <UnableConnection testConnection={() => testConnection(api)} />;
  }

  return (
    <ConnectionContext.Provider
      value={{
        testConnection,
        isLoading,
        isServerOn,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export const useConnection = () => useContext(ConnectionContext);
