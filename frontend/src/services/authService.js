import apiUrl from "../constants/apiUrl";
import httpClient from "../utils/httpClient";
import storageService from "./storageService";

class AuthService {
  async signin({ email, password, remember }) {
    const res = await httpClient.post(apiUrl.auth.signin, { email, password });

    storageService.setAuthData(res.data, remember);

    return res.data;
  }

  async signup({ name, email, password }) {
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

  async forgotPassword({ email }) {
    await httpClient.post(apiUrl.auth.forgotPassword, { email });
  }

  async resetPassword({ password, token }) {
    await httpClient.post(apiUrl.auth.resetPassword, { password, token });
  }

  async refreshAccessToken() {
    const refreshToken = storageService.getLocalRefreshToken();

    if (!refreshToken) return await this.signout();

    await httpClient.post(apiUrl.auth.refreshToken, {
      refreshToken,
    });
  }
}

export default new AuthService();
