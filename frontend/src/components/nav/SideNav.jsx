import { FiX as CloseIcon, FiLogOut as LogoutIcon } from "react-icons/fi";
import React, { useContext } from "react";

import AppLogo from "../common/AppLogo";
import { AuthContext } from "../../contexts/AuthContext";
import NavAvatar from "./NavAvatar";
import { NavLink } from "react-router-dom";
import NavSearchbar from "./NavSearchbar";
import { twMerge } from "tailwind-merge";

function SideNav({ toggleMenu, links = [], open = false, onLogout }) {
  const { isAuthenticated, setIsAuthenticated, authData } =
    useContext(AuthContext);

  return (
    <>
      <div
        className={twMerge(
          "fixed z-50 inset-0 bg-slate-800 opacity-25 hidden xl:hidden",
          open && "block"
        )}
        onClick={toggleMenu}
      ></div>
      <nav
        className={twMerge(
          "z-50 xl:hidden fixed top-0 left-0 bottom-0 gap-5 flex flex-col w-4/6 max-w-xs p-6 bg-white border-r overflow-y-auto ease-in-out duration-300",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="inline-flex items-center mb-8">
          <AppLogo />

          <button className="ml-auto icon-btn-base" onClick={toggleMenu}>
            <CloseIcon size={20} />
          </button>
        </div>

        <NavAvatar
          title={authData?.name}
          subtitle={authData?.email}
          image={authData?.profileImage}
        />

        <NavSearchbar className="sm:hidden mt-6" />

        <h6 className="mt-6 uppercase text-sm font-semibold opacity-70">
          Navigations
        </h6>

        <hr />

        <div className="flex flex-col items-stretch gap-3 text-md font-semibold">
          {links.map(({ to, icon: Icon, text }) => (
            <NavLink
              key={text}
              className={({ isActive }) =>
                twMerge(
                  "hover:bg-slate-100 hover:tracking-[0.3em] rounded-lg inline-flex gap-7 p-4 transition-all",
                  isActive &&
                    "hover:bg-primaryLighter bg-primaryLighter text-primary"
                )
              }
              to={to}
            >
              <Icon size={20} />
              {text}
            </NavLink>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-3 py-4">
          {isAuthenticated ? (
            <button
              className="inline-flex items-center gap-4 justify-center btn-base"
              onClick={() => {
                onLogout();
                toggleMenu();
              }}
            >
              Logout
              <LogoutIcon size={20} />
            </button>
          ) : (
            <>
              <NavLink className="block btn-base" to="/signin">
                Sign In
              </NavLink>
              <NavLink className="block btn-primary" to="/signup">
                Sign Up
              </NavLink>
            </>
          )}
          <p className="text-xs text-center opacity-70">
            <span>Copyright © 2023</span>
          </p>
        </div>
      </nav>
    </>
  );
}

export default SideNav;
