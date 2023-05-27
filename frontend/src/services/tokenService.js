class TokenService {
  getUser() {
    const data = sessionStorage.getItem("user") || localStorage.getItem("user");
    return JSON.parse(data);
  }

  setUser(user, remember = false) {
    if (!remember) return sessionStorage.setItem("user", JSON.stringify(user));

    return localStorage.setItem("user", JSON.stringify(user));
  }

  getLocalRefreshToken() {
    const user = this.getUser();
    return user?.refreshToken;
  }

  removeUser() {
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
  }
}

export default new TokenService();
