import apiUrl from "../constants/apiUrl";
import authService from "../services/authService";
import axios from "axios";

const refreshTokenInterceptor = async (err) => {
  const originalConfig = err.config;

  if (
    err.response?.status === 401 &&
    !originalConfig._retry &&
    !originalConfig.url.includes("/auth/")
  ) {
    try {
      originalConfig._retry = true;
      await authService.refreshAccessToken();
      return await httpClient(originalConfig);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return Promise.reject(err);
};

const httpClient = axios.create({
  baseURL: apiUrl.base,
  withCredentials: true,
});

httpClient.interceptors.response.use((res) => res, refreshTokenInterceptor);

export default httpClient;
