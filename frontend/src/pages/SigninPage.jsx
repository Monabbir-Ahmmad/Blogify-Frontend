import { Link, useNavigate } from "react-router-dom";

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

  const signinMutation = useMutation({
    mutationFn: authService.signin,
    onSuccess: () => {
      authContext.setIsAuthenticated(true);
      navigate("/");
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  const onSignin = (data) => signinMutation.mutate(data);

  return (
    <div className="flex">
      <section className="flex flex-col px-6 py-20 gap-5 items-center justify-center flex-1 min-h-screen ">
        <AppLogo className="text-4xl" size={50} />
        <h1 className="text-center text-4xl font-bold">Welcome Back!</h1>
        <p className="text-center text-xl opacity-80">
          Sign in to your account to continue
        </p>

        <div className="w-5/6 md:w-4/6 mt-5">
          <SigninForm onSubmit={onSignin} />
        </div>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link className="text-primary font-semibold" to="/signup">
            Sign Up
          </Link>
        </p>
      </section>
      <section className="flex-[1.5] p-4 min-h-screen bg-slate-50 border-x border-slate-200 lg:flex items-center justify-center hidden ">
        <object type="image/svg+xml" data={signinImage} className="w-3/4" />
      </section>
    </div>
  );
}

export default SigninPage;
