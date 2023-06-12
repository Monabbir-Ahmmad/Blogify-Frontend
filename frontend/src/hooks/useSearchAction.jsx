import searchService from "../services/searchService";
import { useQuery } from "@tanstack/react-query";

function useSearchAction() {
  const fetchSearchResult = ({ keyword, type, page, limit }) =>
    useQuery({
      enabled: !!keyword,
      queryKey: ["search", { keyword, type, page, limit }],
      queryFn: async () =>
        await searchService.get({ keyword, type, page, limit }),
    });

  return {
    fetchSearchResult,
  };
}

export default useSearchAction;
