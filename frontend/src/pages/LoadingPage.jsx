import { useIsFetching, useIsMutating } from "@tanstack/react-query";

import LoadingOverlay from "../components/common/loader/LoadingOverlay";
import { createPortal } from "react-dom";
import loadingIcon from "../assets/loading.svg";

function LoadingPage() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const skipLoading = useIsMutating({ mutationKey: ["skipLoading"] });

  if (skipLoading) return null;

  if (!isFetching && !isMutating) return null;

  return createPortal(
    <LoadingOverlay icon={loadingIcon} text="loading" />,
    document.body
  );
}

export default LoadingPage;
