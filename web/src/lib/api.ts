import axios from "axios";

export const api = axios.create({
  baseURL: "https://tickets-api.onrender.com/",
});
