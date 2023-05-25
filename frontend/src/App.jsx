import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";

import ContextWrapper from "./contexts/ContextWrapper";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "./Router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextWrapper>
        <Router />
      </ContextWrapper>
      <ToastContainer
        position={toast.POSITION.BOTTOM_CENTER}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
