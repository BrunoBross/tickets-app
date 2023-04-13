import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { API_URL, API_PORT } from "@env";
import useApi from "../lib/api";

interface ConnectionProviderProps {
  children: ReactNode;
}

interface ConnectionContextInterface {
  url: string;
  port: number;
  serverIp: string;
}

const ConnectionContext = createContext({} as ConnectionContextInterface);

export default function ConnectionProvider(props: ConnectionProviderProps) {
  const { children } = props;
  const serverIp = `${API_URL}:${API_PORT}`;

  return (
    <ConnectionContext.Provider
      value={{ url: API_URL, port: API_PORT, serverIp }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export const useConnection = () => useContext(ConnectionContext);
