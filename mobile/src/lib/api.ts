import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.111.227:3001/",
});
