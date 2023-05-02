import axios from "axios";

export default function useApi() {
  const serverIp = "http://192.168.1.104:3000/";
  const api = axios.create({
    baseURL: serverIp,
  });

  return { api, serverIp };
}
