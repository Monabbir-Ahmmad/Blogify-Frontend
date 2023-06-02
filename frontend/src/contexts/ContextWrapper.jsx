import { AuthContextProvider } from "./AuthContext";
import { ModalProvider } from "../components/common/modal/ModalService";

function ContextWrapper({ children }) {
  return (
    <ModalProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </ModalProvider>
  );
}

export default ContextWrapper;
