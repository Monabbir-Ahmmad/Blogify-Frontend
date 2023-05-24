import {
  FiX as CloseIcon,
  FiHome as HomeIcon,
  FiUser as ProfileIcon,
  FiFeather as WriteIcon,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";
import NavLogo from "./NavLogo";
import NavSearchbar from "./NavSearchbar";
import React from "react";

function SideNav({ toggleMenu }) {
  return (
    <nav className="fixed top-0 left-0 bottom-0 gap-5 flex flex-col w-5/6 max-w-sm p-6 bg-white border-r overflow-y-auto">
      <div className="inline-flex items-center mb-8">
        <NavLogo />

        <button className="ml-auto icon-btn-base" onClick={toggleMenu}>
          <CloseIcon size={20} />
        </button>
      </div>

      <NavSearchbar className="sm:hidden" />

      <div className="flex flex-col items-stretch gap-2 text-md font-semibold text-gray-600">
        <NavLink
          className={({ isActive }) =>
            `${
              isActive
                ? "border-primary bg-primaryLighter text-primary"
                : "border-transparent"
            } border inline-flex gap-7 p-4 hover:bg-primaryLighter hover:text-primary rounded`
          }
          to="/"
        >
          <HomeIcon size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive
                ? "border-primary bg-primaryLighter text-primary"
                : "border-transparent"
            } border inline-flex gap-7 p-4 hover:bg-primaryLighter hover:text-primary rounded`
          }
          to="/write"
        >
          <WriteIcon size={20} />
          <span>Write</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive
                ? "border-primary bg-primaryLighter text-primary"
                : "border-transparent"
            } border inline-flex gap-7 p-4 hover:bg-primaryLighter hover:text-primary rounded`
          }
          to="/profile"
        >
          <ProfileIcon size={20} />
          <span>Profile</span>
        </NavLink>
      </div>
      <div className="mt-auto flex flex-col gap-3 py-4">
        <NavLink className="block btn-base" to="/">
          Sign In
        </NavLink>
        <NavLink className="block btn-primary" to="/">
          Sign Up
        </NavLink>
        <p className=" text-xs text-center text-gray-400">
          <span>Copyright © 2023</span>
        </p>
      </div>
    </nav>
  );
}

export default SideNav;
