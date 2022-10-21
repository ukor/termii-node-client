import Axios, { AxiosInstance } from "axios";
import { TermiiError } from "./error";

const BASE_URL = "https://api.ng.termii.com";

const AxiosInstance: AxiosInstance = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${API_KEY}`,
  },
});

// Axios response Interceptors
AxiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const msg = error.response?.data?.message ?? "Server Error";

    // console.error("error message >> ", msg);

    return Promise.reject(new TermiiError(msg));
  },
);

export { AxiosInstance };
