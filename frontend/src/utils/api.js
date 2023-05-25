import apiUrl from "../constants/apiUrl";
import axios from "axios";
import tokenService from "../services/tokenService";

const logError = (error) => {
  console.error(error.response);
  return Promise.reject(error);
};

const refreshTokenInterceptor = async (err) => {
  const originalConfig = err.config;

  // Access Token was expired
  if (err.response?.status === 401 && !originalConfig._retry) {
    originalConfig._retry = true;

    try {
      const res = await api.post(apiUrl.auth.refreshToken, {
        refreshToken: tokenService.getLocalRefreshToken(),
      });

      const { accessToken } = res.data;

      tokenService.updateLocalAccessToken(accessToken);

      return api(originalConfig);
    } catch (error) {
      //Refresh token was expired
      tokenService.removeUser();

      return Promise.reject(error);
    }
  }
  return Promise.reject(err);
};

const api = axios.create({
  baseURL: apiUrl.host,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.defaults.headers["Content-Type"] = "application/json";

api.interceptors.response.use((res) => res, logError);

api.interceptors.request.use((res) => res, refreshTokenInterceptor);

export default api;
