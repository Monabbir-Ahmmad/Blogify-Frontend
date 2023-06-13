import { Outlet, useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import Footer from "../components/footer/Footer";
import Navbar from "../components/nav/Navbar";
import authService from "../services/authService";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

function LandingPage() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const logoutMutation = useMutation({
    mutationFn: authService.signout,
    onMutate: () => {
      setIsAuthenticated(false);
      navigate("/signin");
    },
  });

  const onLogout = () => logoutMutation.mutate();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar onLogout={onLogout} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default LandingPage;
