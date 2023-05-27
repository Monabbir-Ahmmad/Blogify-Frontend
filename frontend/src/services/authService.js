import apiUrl from "../constants/apiUrl";
import httpClient from "../utils/httpClient";
import tokenService from "./tokenService";

class AuthService {
  async signin({ email, password, remember }) {
    const res = await httpClient.post(apiUrl.auth.signin, { email, password });

    tokenService.setUser(res.data, remember);

    return res.data;
  }

  async signup({ name, email, password }) {
    const res = await httpClient.post(apiUrl.auth.signup, {
      name,
      email,
      password,
    });

    tokenService.setUser(res.data);

    return res.data;
  }

  async signout() {
    await httpClient.post(apiUrl.auth.signout);
    tokenService.removeUser();
  }

  async forgotPassword({ email }) {
    await httpClient.post(apiUrl.auth.forgotPassword, { email });
  }

  async resetPassword({ password, token }) {
    await httpClient.post(apiUrl.auth.resetPassword, { password, token });
  }

  async refreshAccessToken() {
    const refreshToken = tokenService.getLocalRefreshToken();

    if (!refreshToken) return await this.signout();

    await httpClient.post(apiUrl.auth.refreshToken, {
      refreshToken,
    });
  }
}

export default new AuthService();
