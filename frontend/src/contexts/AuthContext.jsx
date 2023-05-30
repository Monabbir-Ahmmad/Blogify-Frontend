import { createContext, useEffect, useState } from "react";

import authService from "../services/authService";
import storageService from "../services/storageService";
import { useQuery } from "@tanstack/react-query";
import userService from "../services/userService";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [authData, setAuthData] = useState(storageService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!storageService.getAuthData()
  );

  useQuery({
    enabled: isAuthenticated,
    queryKey: ["getCurrentUser"],
    queryFn: async () => {
      const data = await userService.getCurrentUser();
      setAuthData(data);
      return data;
    },
  });

  useEffect(() => {
    try {
      authService.refreshAccessToken();
    } catch (error) {}
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
