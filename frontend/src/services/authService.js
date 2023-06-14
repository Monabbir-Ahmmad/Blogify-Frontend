import apiUrl from "../constants/apiUrl";
import httpClient from "../utils/httpClient";
import storageService from "./storageService";

class AuthService {
  async signin({ email, password, remember }) {
    email = email.trim();

    const res = await httpClient.post(apiUrl.auth.signin, { email, password });

    storageService.setAuthData(res.data, remember);

    return res.data;
  }

  async signup({ name, email, password }) {
    email = email.trim();
    name = name.trim();

    const res = await httpClient.post(apiUrl.auth.signup, {
      name,
      email,
      password,
    });

    storageService.setAuthData(res.data);

    return res.data;
  }

  async signout() {
    await httpClient.post(apiUrl.auth.signout);
    storageService.removeAuthData();
  }

  async forgotPassword(email) {
    await httpClient.post(apiUrl.auth.forgotPassword, { email });
  }

  async resetPassword(newPassword, resetToken) {
    await httpClient.put(apiUrl.auth.resetPassword, {
      newPassword,
      resetToken,
    });
  }

  async refreshAccessToken() {
    const refreshToken = storageService.getLocalRefreshToken();

    if (!refreshToken) return await this.signout();

    try {
      await httpClient.post(apiUrl.auth.refreshToken, {
        refreshToken,
      });
    } catch (error) {
      storageService.removeAuthData();
      document.dispatchEvent(new Event("logout"));

      if (error.response?.status === 401 && error.response.data) {
        error.response.data.message =
          "Your session has expired. Please login again.";
      }

      throw error;
    }
  }
}

export default new AuthService();
