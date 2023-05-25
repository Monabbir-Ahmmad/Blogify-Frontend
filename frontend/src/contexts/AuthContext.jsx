import { createContext, useState } from "react";

const AuthContext = createContext({
  authData: null,
  setAuthData: () => {},
});

function AuthContextProvider({ children, ...rest }) {
  const [authData, setAuthData] = useState(null);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
