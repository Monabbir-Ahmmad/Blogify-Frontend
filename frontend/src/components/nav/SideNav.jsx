import {
  RiCloseLine as CloseIcon,
  RiSunLine as DarkModeIcon,
  RiMoonClearLine as LightModeIcon,
  RiLogoutCircleRLine as LogoutIcon,
} from "react-icons/ri";
import { useContext, useRef } from "react";

import AppLogo from "../common/logo/AppLogo";
import { AuthContext } from "../../contexts/AuthContext";
import Avatar from "../common/avatar/Avatar";
import { NavLink } from "react-router-dom";
import Searchbar from "../search/Searchbar";
import { ThemeContext } from "../../contexts/ThemeContext";
import { twMerge } from "tailwind-merge";

const NavThemeButton = ({ darkMode, toggleDarkMode }) => {
  const ThemeIcon = darkMode ? LightModeIcon : DarkModeIcon;
  return (
    <button className="btn-base gap-4" onClick={toggleDarkMode}>
      Enable {darkMode ? "Light" : "Dark"} Mode
      <ThemeIcon
        size={20}
        className={darkMode ? "text-primary" : "text-yellow-500"}
      />
    </button>
  );
};

const NavAuthButtons = () => (
  <>
    <NavLink className="btn-base" to="/signin">
      Sign In
    </NavLink>
    <NavLink className="btn-primary" to="/signup">
      Sign Up
    </NavLink>
  </>
);

function SideNav({ toggleMenu, links = [], open = false, onLogout }) {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { isAuthenticated, authData } = useContext(AuthContext);
  const navRef = useRef();

  const onClickOutside = (e) => {
    if (navRef.current && !navRef.current.contains(e.target)) {
      toggleMenu();
    }
  };

  const onLogoutClick = () => {
    onLogout();
    toggleMenu();
  };

  return (
    <div
      className={twMerge(
        "z-50 xl:hidden fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50 transition-opacity",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClickOutside}
    >
      <nav
        data-testid="side-nav"
        ref={navRef}
        className={twMerge(
          "h-screen gap-5 flex flex-col w-4/6 max-w-xs p-6 bg-paper transition-transform overflow-y-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="inline-flex items-center mb-8">
          <AppLogo />

          <button
            data-testid="close-button"
            className="ml-auto icon-btn-base"
            onClick={toggleMenu}
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {isAuthenticated && (
          <Avatar
            title={authData?.name}
            image={authData?.profileImage}
            rounded="rounded-full"
          />
        )}

        <Searchbar className="sm:hidden mt-6" />

        <h6 className="mt-6 uppercase text-sm font-semibold opacity-70">
          Navigations
        </h6>

        <hr className="border-divider" />

        <div className="flex flex-col items-stretch gap-3 text-base font-semibold">
          {links.map(({ to, icon: Icon, text, authRequired }) =>
            authRequired && !isAuthenticated ? null : (
              <NavLink
                key={text}
                className={({ isActive }) =>
                  twMerge(
                    "hover:bg-slate-100 dark:hover:bg-neutral-800 hover:tracking-[0.3em] rounded-lg inline-flex gap-7 p-4 transition-all",
                    isActive &&
                      "hover:bg-primaryLighter bg-primaryLighter text-primary dark:hover:bg-primaryLighter"
                  )
                }
                to={to}
              >
                <Icon size={20} />
                {text}
              </NavLink>
            )
          )}
        </div>
        <div className="mt-auto flex flex-col gap-3 py-4">
          <NavThemeButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          {isAuthenticated ? (
            <button className="btn-base gap-4" onClick={onLogoutClick}>
              Logout
              <LogoutIcon size={20} />
            </button>
          ) : (
            <NavAuthButtons />
          )}
          <p className="text-xs text-center opacity-70">
            <span>Copyright © 2023</span>
          </p>
        </div>
      </nav>
    </div>
  );
}

export default SideNav;
