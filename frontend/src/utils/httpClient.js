import apiUrl from "../constants/apiUrl";
import authService from "../services/authService";
import axios from "axios";
import tokenService from "../services/tokenService";

const refreshTokenInterceptor = async (err) => {
  const originalConfig = err.config;

  if (err.response?.status === 401 && !originalConfig._retry) {
    originalConfig._retry = true;

    try {
      await authService.refreshAccessToken();

      return httpClient(originalConfig);
    } catch (error) {
      tokenService.removeUser();

      return Promise.reject(error);
    }
  }
  return Promise.reject(err);
};

const httpClient = axios.create({
  baseURL: apiUrl.base,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

httpClient.defaults.headers["Content-Type"] = "application/json";

httpClient.interceptors.request.use((res) => res, refreshTokenInterceptor);

export default httpClient;
