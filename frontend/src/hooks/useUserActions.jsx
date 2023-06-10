import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import userService from "../services/userService";

function useUserActions() {
  const queryClient = useQueryClient();

  const fetchCurrentUser = (isAuthenticated) =>
    useQuery({
      enabled: isAuthenticated,
      queryKey: ["getCurrentUser"],
      queryFn: userService.getCurrentUser,
      staleTime: 0,
    });

  const fetchUser = (userId) =>
    useQuery({
      enabled: !!userId,
      queryKey: ["getUser", userId],
      queryFn: async () => await userService.get(userId),
    });

  const profileImageUpdateMutation = useMutation({
    mutationFn: async ({ userId, image }) =>
      await userService.updateProfileImage(userId, image),
    onSuccess: (data, { userId }) => {
      queryClient.setQueryData(["getUser", userId], (oldData) => data);
      queryClient.setQueryData(["getCurrentUser"], (oldData) => data);
    },
  });

  const coverImageUpdateMutation = useMutation({
    mutationFn: async ({ userId, image }) =>
      await userService.updateCoverImage(userId, image),
    onSuccess: (data, { userId }) => {
      queryClient.setQueryData(["getUser", userId], (oldData) => data);
      queryClient.setQueryData(["getCurrentUser"], (oldData) => data);
    },
  });

  const profileUpdateMutation = useMutation({
    mutationFn: async ({ userId, data }) =>
      await userService.updateProfile(userId, data),
    onSuccess: (data, { userId }) => {
      queryClient.setQueryData(["getUser", userId], (oldData) => data);
      queryClient.setQueryData(["getCurrentUser"], (oldData) => data);
    },
  });

  const passwordUpdateMutation = useMutation({
    mutationFn: async ({ userId, oldPassword, newPassword }) =>
      await userService.updatePassword(userId, oldPassword, newPassword),
  });

  return {
    fetchCurrentUser,
    fetchUser,
    profileUpdateMutation,
    passwordUpdateMutation,
    profileImageUpdateMutation,
    coverImageUpdateMutation,
  };
}

export default useUserActions;
