import { NavLink, useNavigate } from "react-router-dom";

import AppLogo from "../components/common/AppLogo";
import { AuthContext } from "../contexts/AuthContext";
import SigninForm from "../components/signin/SigninForm";
import authService from "../services/authService";
import signinImage from "../assets/signinImage.svg";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

function SigninPage() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const signupMutation = useMutation({
    mutationFn: authService.signin,
    onSuccess: (data) => {
      authContext.setAuthState(data);
      navigate("/");
    },
    onError: (error) => toast.error(error.message),
  });

  const onSignin = (data) => signupMutation.mutate(data);

  return (
    <div className="flex">
      <section className="flex flex-col px-6 py-5 gap-5 items-center justify-center flex-1 h-screen bg-gray-100">
        <AppLogo className="text-5xl" size={60} />
        <h1 className="text-center text-5xl font-bold text-gray-800">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600">
          Sign in to your account to continue
        </p>

        {signupMutation.isLoading && (
          <p className="text-gray-600">Loading...</p>
        )}

        <div className="w-5/6 md:w-4/6">
          <SigninForm onSubmit={onSignin} />
        </div>
        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <NavLink className="text-primary font-semibold" to="/signup">
            Sign Up
          </NavLink>
        </p>
      </section>
      <section className="flex-1 p-4 h-screen bg-primaryLight lg:flex items-center justify-center hidden ">
        <object type="image/svg+xml" data={signinImage} className="w-3/4" />
      </section>
    </div>
  );
}

export default SigninPage;
