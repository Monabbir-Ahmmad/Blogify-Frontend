import api from "../utils/api";
import apiUrl from "../constants/apiUrl";
import tokenService from "./tokenService";

class AuthService {
  async signin(email, password) {
    const res = await api.post(apiUrl.auth.signin, { email, password });

    tokenService.setUser(res.data);

    return res;
  }

  async signup(name, email, password) {
    return await api.post(apiUrl.auth.signup, { name, email, password });
  }

  async signout() {
    await api.post(apiUrl.auth.signout);
    tokenService.removeUser();
  }
}

export default new AuthService();
