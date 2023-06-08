import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";

import ContextWrapper from "./contexts/ContextWrapper";
import LoadingOverlay from "./components/common/loader/LoadingOverlay";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "./Router";

const onHttpError = (error, _variables, _context, mutation) => {
  // If this has an onError defined, skip this
  if (mutation?.options?.onError) return;

  toast.error(error.response.data.message, {
    toastId: error.response.data.message,
  });
};

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: onHttpError,
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextWrapper>
        <Router />
      </ContextWrapper>

      <LoadingOverlay />

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
