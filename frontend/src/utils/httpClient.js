import apiUrl from "../constants/apiUrl";
import authService from "../services/authService";
import axios from "axios";
import storageService from "../services/storageService";

const refreshTokenInterceptor = async (err) => {
  const originalConfig = err.config;

  if (err.response?.status === 401 && !originalConfig._retry) {
    originalConfig._retry = true;

    try {
      await authService.refreshAccessToken();

      return httpClient(originalConfig);
    } catch (error) {
      storageService.removeAuthData();

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
