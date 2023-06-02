import { Outlet, useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
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
    <div>
      <Navbar onLogout={onLogout} />
      <Outlet />
    </div>
  );
}

export default LandingPage;
