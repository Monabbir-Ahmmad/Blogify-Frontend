import { useQuery } from "@tanstack/react-query";
import userService from "../services/userService";

function useUserActions() {
  const fetchCurrentUser = () =>
    useQuery({
      enabled: false,
      queryKey: ["getCurrentUser"],
      queryFn: async () => await userService.getCurrentUser(),
      staleTime: 0,
    });

  const fetchUser = (userId) =>
    useQuery({
      enabled: !!userId,
      queryKey: ["getUser", userId],
      queryFn: async () => await userService.get(userId),
    });

  return {
    fetchCurrentUser,
    fetchUser,
  };
}

export default useUserActions;
