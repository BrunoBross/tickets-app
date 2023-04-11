import axios from "axios";
import { useConnection } from "../contexts/ConnectionContext";

export default function useApi() {
  const { serverIp } = useConnection();

  return axios.create({
    baseURL: serverIp,
  });
}
