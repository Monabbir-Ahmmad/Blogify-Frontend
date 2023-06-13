import { Outlet, useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import Footer from "../components/footer/Footer";
import Navbar from "../components/nav/Navbar";
import useAuthAction from "../hooks/useAuthAction";
import { useContext } from "react";

function LandingPage() {
  const navigate = useNavigate();
  const { signoutMutation } = useAuthAction(useContext(AuthContext));

  const onLogout = () =>
    signoutMutation.mutate(null, {
      onSuccess: () => {
        navigate("/signin");
      },
    });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onLogout={onLogout} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default LandingPage;
