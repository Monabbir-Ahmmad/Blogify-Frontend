import { createContext, useState } from "react";

import tokenService from "../services/tokenService";
import { useQuery } from "@tanstack/react-query";
import userService from "../services/userService";

const AuthContext = createContext();

function AuthContextProvider({ children, ...rest }) {
  const [authData, setAuthData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!tokenService.getUser()
  );

  const user = tokenService.getUser();

  useQuery({
    enabled: isAuthenticated,
    queryKey: ["auth", user?.userId],
    queryFn: async () => {
      let data = null;
      if (user) data = await userService.getUser(user.userId);
      setAuthData(data);
      return data;
    },
  });

  return (
    <AuthContext.Provider
      value={{ authData, setAuthData, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
