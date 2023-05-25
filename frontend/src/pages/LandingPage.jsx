import Navbar from "../components/nav/Navbar";
import { Outlet } from "react-router-dom";
import React from "react";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default LandingPage;
