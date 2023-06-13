import { AuthContextProvider } from "./AuthContext";
import { ModalContextProvider } from "./ModalContext";
import { ThemeContextProvider } from "./ThemeContext";

function ContextWrapper({ children }) {
  return (
    <ThemeContextProvider>
      <ModalContextProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </ModalContextProvider>
    </ThemeContextProvider>
  );
}

export default ContextWrapper;
