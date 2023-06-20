import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import AppLogo from "../components/common/logo/AppLogo";
import { AuthContext } from "../contexts/AuthContext";
import SigninForm from "../components/signin/SigninForm";
import signinImage from "../assets/signinImage.svg";
import useAuthAction from "../hooks/useAuthAction";

function SigninPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const { signinMutation } = useAuthAction(useContext(AuthContext));

  const onSignin = (data) => signinMutation.mutate(data);

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className="flex">
      <section className="flex flex-col px-6 py-20 gap-5 items-center justify-center flex-1 min-h-screen ">
        <AppLogo className="text-4xl" size={50} />
        <h1 className="text-center text-4xl font-bold">Welcome Back!</h1>
        <p className="text-center text-xl opacity-80">
          Sign in to your account to continue
        </p>

        <div className="w-5/6 md:w-4/6 mt-5">
          <SigninForm onSubmit={onSignin} />
        </div>
        <p>
          Don't have an account?{" "}
          <Link className="text-primary font-semibold" to="/signup">
            Sign Up
          </Link>
        </p>

        <p>
          Or{" "}
          <Link className="text-primary font-semibold" to="/">
            continue as Guest
          </Link>
        </p>
      </section>
      <section className="flex-[1.5] p-4 min-h-screen bg-slate-50 dark:bg-paper border-x border-divider lg:flex items-center justify-center hidden ">
        <object type="image/svg+xml" data={signinImage} className="w-3/4" />
      </section>
    </main>
  );
}

export default SigninPage;
