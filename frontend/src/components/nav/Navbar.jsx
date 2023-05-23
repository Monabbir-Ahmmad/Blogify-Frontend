import {
  FiMenu as MenuIcon,
  FiLogIn as SigninIcon,
  FiUserPlus as SignupIcon,
} from "react-icons/fi";

import { GiOverInfinity as Logo } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-background">
      <div className="flex flex-wrap items-center justify-between mx-auto py-4 px-6">
        <NavLink to="/" className="flex items-center gap-2">
          <Logo size={35} className="text-primary" />
          <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
            Blogify
          </span>
        </NavLink>

        <div className="items-center hidden md:flex md:w-auto gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary" : "dark:text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/write"
            className={({ isActive }) =>
              isActive ? "text-primary" : "dark:text-white"
            }
          >
            Write
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "text-primary" : "dark:text-white"
            }
          >
            Profile
          </NavLink>

          <div className="flex gap-2">
            <button className="btn-primary-outlined inline-flex gap-2">
              <span>Create Account</span>
              <SignupIcon size={20} />
            </button>

            <button className="btn-primary inline-flex gap-1">
              <span>Sign In</span>
              <SigninIcon size={20} />
            </button>
          </div>
        </div>

        <div className="flex md:hidden gap-3">
          <button className="btn-primary inline-flex gap-1">
            <span>Sign In</span>
            <SigninIcon size={20} />
          </button>

          <button type="button" className="icon-btn-base" onClick={toggleMenu}>
            <MenuIcon size={20} />
          </button>
        </div>
      </div>

      <div></div>
    </nav>
  );
}

export default Navbar;
