import { useIsFetching, useIsMutating } from "@tanstack/react-query";

import loadingIcon from "../../../assets/loading.svg";

const LoadingOverlay = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  if (!isFetching && !isMutating) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50">
      <object
        type="image/svg+xml"
        data={loadingIcon}
        className="max-w-xs w-full"
      />
      <span className="text-2xl text-primaryLight">Loading</span>
    </div>
  );
};

export default LoadingOverlay;
