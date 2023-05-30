class StorageService {
  getAuthData() {
    const data = sessionStorage.getItem("auth") || localStorage.getItem("auth");
    return JSON.parse(data);
  }

  setAuthData(authData, remember = false) {
    if (!remember)
      return sessionStorage.setItem(
        "auth",
        JSON.stringify({ ...authData, remember })
      );

    return localStorage.setItem(
      "auth",
      JSON.stringify({ ...authData, remember })
    );
  }

  getLocalRefreshToken() {
    const authData = this.getAuthData();
    return authData?.refreshToken;
  }

  removeAuthData() {
    sessionStorage.removeItem("auth");
    localStorage.removeItem("auth");
  }

  setCurrentUser(user) {
    const authData = this.getAuthData();

    if (authData?.remember)
      return localStorage.setItem(
        "auth",
        JSON.stringify({ ...authData, user })
      );

    return sessionStorage.setItem(
      "auth",
      JSON.stringify({ ...authData, user })
    );
  }

  getCurrentUser() {
    const authData = this.getAuthData();
    return authData?.user;
  }
}

export default new StorageService();
