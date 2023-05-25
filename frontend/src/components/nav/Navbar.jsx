import {
  FiHome as HomeIcon,
  FiMenu as MenuIcon,
  FiUser as ProfileIcon,
  FiFeather as WriteIcon,
} from "react-icons/fi";

import AppLogo from "../common/AppLogo";
import { NavLink } from "react-router-dom";
import NavSearchbar from "./NavSearchbar";
import SideNav from "./SideNav";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="border-b border-gray-200 relative w-full gap-2 p-4 inline-flex items-center bg-white">
        <AppLogo className="mr-4" />

        <NavSearchbar className="hidden sm:block" />

        <div className="hidden text-md text-gray-400  absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 xl:flex mx-auto items-center gap-10 w-auto">
          <NavLink
            to="/write"
            className={({ isActive }) =>
              twMerge(
                "inline-flex gap-2",
                isActive ? "text-primary" : "text-gray-500 hover:text-gray-700"
              )
            }
          >
            <WriteIcon size={20} />
            <span>Write</span>
          </NavLink>

          <span>|</span>

          <NavLink
            to="/"
            className={({ isActive }) =>
              twMerge(
                "inline-flex gap-2",
                isActive ? "text-primary" : "text-gray-500 hover:text-gray-700"
              )
            }
          >
            <HomeIcon size={20} />
            <span>Home</span>
          </NavLink>
          <span>|</span>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              twMerge(
                "inline-flex gap-2",
                isActive ? "text-primary" : "text-gray-500 hover:text-gray-700"
              )
            }
          >
            <ProfileIcon size={20} />
            <span>Profile</span>
          </NavLink>
        </div>
        <NavLink
          className="hidden xl:inline-block xl:ml-auto btn-base"
          to="/signin"
        >
          Sign In
        </NavLink>
        <NavLink className="hidden xl:inline-block btn-primary" to="/signup">
          Sign Up
        </NavLink>

        <button className="xl:hidden ml-auto icon-btn-base text-orange-600">
          <MenuIcon size={20} onClick={toggleMenu} />
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
