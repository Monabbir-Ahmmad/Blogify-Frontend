import "../../styles/navbar.css";

import {
  RiMoonClearLine as DarkModeIcon,
  RiHome3Line as HomeIcon,
  RiSunLine as LightModeIcon,
  RiLogoutCircleRLine as LogoutIcon,
  RiMenu3Line as MenuIcon,
  RiUser6Line as ProfileIcon,
  RiQuillPenLine as WriteIcon,
} from "react-icons/ri";
import { useContext, useState } from "react";

import AppLogo from "../common/logo/AppLogo";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import NavProfileMenu from "./NavProfileMenu";
import Searchbar from "../search/Searchbar";
import SideNav from "./SideNav";
import { ThemeContext } from "../../contexts/ThemeContext";

const NavRightButtons = ({ darkMode, toggleDarkMode }) => {
  const ThemeIcon = darkMode ? DarkModeIcon : LightModeIcon;
  return (
    <>
      <button
        className="hidden xl:inline-block xl:ml-auto icon-btn-base rounded-full"
        onClick={toggleDarkMode}
      >
        <ThemeIcon
          size={20}
          className={darkMode ? "text-primary" : "text-secondary"}
        />
      </button>
      <NavLink
        className="hidden xl:inline-block btn-base rounded-full"
        to="/signin"
      >
        Sign In
      </NavLink>
      <NavLink
        className="hidden xl:inline-block btn-primary rounded-full"
        to="/signup"
      >
        Sign Up
      </NavLink>
    </>
  );
};

function Navbar({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { isAuthenticated, authData } = useContext(AuthContext);

  const toggleMenu = () => setSidebarOpen(!sidebarOpen);

  const links = [
    {
      to: "/",
      icon: HomeIcon,
      text: "Home",
    },
    {
      to: "/write",
      icon: WriteIcon,
      text: "Write",
    },
    {
      to: "/profile/" + authData?.id,
      icon: ProfileIcon,
      text: "Profile",
      sideNavOnly: true,
      authRequired: true,
    },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-divider w-screen gap-2 p-4 inline-flex items-center bg-background">
        <AppLogo className="mr-4" />

        <Searchbar className="hidden sm:block" userId={authData?.id} />

        <div className="hidden text-base absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 xl:flex mx-auto items-center w-auto">
          <NavLinks links={links} />
        </div>

        {isAuthenticated ? (
          <NavProfileMenu onLogout={onLogout} className="ml-auto" />
        ) : (
          <NavRightButtons
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}

        <button
          className="xl:hidden ml-auto icon-btn-base text-primary"
          onClick={toggleMenu}
        >
          <MenuIcon size={20} />
        </button>
      </nav>

      <SideNav
        toggleMenu={toggleMenu}
        links={links}
        open={sidebarOpen}
        onLogout={onLogout}
      />
    </>
  );
}

export default Navbar;
