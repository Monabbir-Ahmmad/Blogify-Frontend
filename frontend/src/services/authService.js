import apiUrl from "../constants/apiUrl";
import httpClient from "../utils/httpClient";
import tokenService from "./tokenService";

class AuthService {
  async signin({ email, password }) {
    const res = await httpClient.post(apiUrl.auth.signin, { email, password });

    tokenService.setUser(res.data);

    return res;
  }

  async signup({ name, email, password }) {
    return await httpClient.post(apiUrl.auth.signup, { name, email, password });
  }

  async signout() {
    await httpClient.post(apiUrl.auth.signout);
    tokenService.removeUser();
  }
}

export default new AuthService();
