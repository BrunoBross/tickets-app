import axios from "axios";

export const api = axios.create({
  baseURL: "https://uniticketsapi.onrender.com/",
});
