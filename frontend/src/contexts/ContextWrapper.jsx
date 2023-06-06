import { AuthContextProvider } from "./AuthContext";
import { ModalContextProvider } from "./ModalContext";

function ContextWrapper({ children }) {
  return (
    <ModalContextProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </ModalContextProvider>
  );
}

export default ContextWrapper;
