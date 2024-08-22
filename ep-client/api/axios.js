import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_AXIOS_PROD
    : import.meta.env.VITE_AXIOS_DEV,
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.PROD
  ? import.meta.env.VITE_AXIOS_PROD
  : import.meta.env.VITE_AXIOS_DEV,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
