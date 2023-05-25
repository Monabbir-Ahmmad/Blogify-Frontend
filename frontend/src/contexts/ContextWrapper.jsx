import { AuthContextProvider } from "./AuthContext";

function ContextWrapper({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}

export default ContextWrapper;
