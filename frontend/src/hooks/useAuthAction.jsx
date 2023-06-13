import authService from "../services/authService";
import { useMutation } from "@tanstack/react-query";

function useAuthAction(authContext) {
  const { setIsAuthenticated } = authContext;

  const signinMutation = useMutation({
    mutationFn: authService.signin,
    onSuccess: () => setIsAuthenticated(true),
  });

  const signupMutation = useMutation({
    mutationFn: authService.signup,
    onSuccess: () => setIsAuthenticated(true),
  });

  const signoutMutation = useMutation({
    mutationFn: authService.signout,
    onMutate: () => {
      setIsAuthenticated(false);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async ({ password, token }) =>
      await authService.resetPassword(password, token),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: authService.forgotPassword,
  });

  return {
    signinMutation,
    signupMutation,
    signoutMutation,
    resetPasswordMutation,
    forgotPasswordMutation,
  };
}

export default useAuthAction;
