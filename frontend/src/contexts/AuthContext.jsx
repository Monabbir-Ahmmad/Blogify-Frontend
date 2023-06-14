import { createContext, useEffect, useState } from "react";

import authService from "../services/authService";
import storageService from "../services/storageService";
import useUserActions from "../hooks/useUserActions";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [authData, setAuthData] = useState(storageService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!storageService.getAuthData()
  );

  const { fetchCurrentUser } = useUserActions();

  const { data: user } = fetchCurrentUser(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) setAuthData(null);
    else setAuthData(user ?? storageService.getCurrentUser());
  }, [isAuthenticated, user]);

  useEffect(() => {
    document.addEventListener("logout", () => setIsAuthenticated(false));

    authService.refreshAccessToken();

    return () => {
      document.removeEventListener("logout", () => setIsAuthenticated(false));
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ authData, setAuthData, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
