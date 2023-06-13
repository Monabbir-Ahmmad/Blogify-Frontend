import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import AppLogo from "../components/common/AppLogo";
import { AuthContext } from "../contexts/AuthContext";
import SignupForm from "../components/signup/SignupForm";
import authService from "../services/authService";
import signupImage from "../assets/signupImage.svg";
import { useMutation } from "@tanstack/react-query";

function SignupPage() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const signupMutation = useMutation({
    mutationFn: authService.signup,
    onSuccess: () => setIsAuthenticated(true),
  });

  const onSignup = (data) => signupMutation.mutate(data);

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className="flex">
      <section className="flex-1 p-4 min-h-screen bg-slate-50 dark:bg-paper border-x border-divider lg:flex items-center justify-center hidden ">
        <object type="image/svg+xml" data={signupImage} className="w-3/4" />
      </section>
      <section className="flex flex-col px-6 py-20 gap-5 items-center justify-center flex-1 min-h-screen">
        <AppLogo className="text-4xl" size={50} />
        <h1 className="text-center text-4xl font-bold">Hello New User!</h1>
        <p className="text-center text-xl opacity-80">
          Sign up and start creating wonderful blogs to share with the world
        </p>

        <div className="w-5/6 md:w-4/6 mt-5">
          <SignupForm onSubmit={onSignup} />
        </div>
        <p>
          Already have an account?{" "}
          <Link className="text-primary font-semibold" to="/signin">
            Sign In
          </Link>
        </p>

        <p>
          Or{" "}
          <Link className="text-primary font-semibold" to="/">
            continue as Guest
          </Link>
        </p>
      </section>
    </main>
  );
}

export default SignupPage;
