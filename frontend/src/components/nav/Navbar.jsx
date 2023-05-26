import { FiLogOut as LogoutIcon, FiMenu as MenuIcon } from "react-icons/fi";
import { useContext, useState } from "react";

import AppLogo from "../common/AppLogo";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import NavSearchbar from "./NavSearchbar";
import SideNav from "./SideNav";
import authService from "../../services/authService";
import { twMerge } from "tailwind-merge";
import { useMutation } from "@tanstack/react-query";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated, authData } =
    useContext(AuthContext);

  const logoutMutation = useMutation({
    mutationFn: authService.signout,
    onMutate: () => setIsAuthenticated(false),
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const onLogout = () => logoutMutation.mutate();

  return (
    <>
      <nav className="border-b border-gray-200 relative w-full gap-2 p-4 inline-flex items-center bg-white">
        <AppLogo className="mr-4" />

        <NavSearchbar className="hidden sm:block" userId={authData?.id} />

        <div className="hidden text-md text-gray-400  absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 xl:flex mx-auto items-center gap-10 w-auto">
          <NavLinks userId={authData?.id} />
        </div>

        {isAuthenticated ? (
          <button
            className="hidden ml-auto xl:inline-flex gap-2 btn-primary"
            onClick={onLogout}
          >
            <span>Logout</span>
            <LogoutIcon size={20} />
          </button>
        ) : (
          <>
            <NavLink
              className="hidden xl:inline-block xl:ml-auto btn-base"
              to="/signin"
            >
              Sign In
            </NavLink>
            <NavLink
              className="hidden xl:inline-block btn-primary"
              to="/signup"
            >
              Sign Up
            </NavLink>
          </>
        )}

        <button
          className="xl:hidden ml-auto icon-btn-base text-primary"
          onClick={toggleMenu}
        >
          <MenuIcon size={20} />
        </button>
      </nav>
      <div
        className={twMerge(
          "relative z-50 hidden xl:hidden",
          isMenuOpen && "block"
        )}
      >
        <div className="fixed inset-0 bg-gray-800 opacity-25"></div>

        <SideNav toggleMenu={toggleMenu} />
      </div>
    </>
  );
}

export default Navbar;
