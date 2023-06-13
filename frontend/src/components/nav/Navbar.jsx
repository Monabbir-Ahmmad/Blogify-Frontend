import {
  RiMoonClearLine as DarkModeIcon,
  RiHome3Line as HomeIcon,
  RiSunLine as LightModeIcon,
  RiLogoutCircleRLine as LogoutIcon,
  RiMenu3Line as MenuIcon,
  RiUser6Line as ProfileIcon,
  RiQuillPenLine as WriteIcon,
} from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { useContext, useRef, useState } from "react";

import AppLogo from "../common/AppLogo";
import { AuthContext } from "../../contexts/AuthContext";
import Avatar from "../common/avatar/Avatar";
import NavLinks from "./NavLinks";
import Popover from "../common/popover/Popover";
import Searchbar from "../search/Searchbar";
import SideNav from "./SideNav";
import { ThemeContext } from "../../contexts/ThemeContext";

function Navbar({ onLogout }) {
  const profileMenuRef = useRef();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
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
      sideOnly: true,
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
          <div className="hidden ml-auto xl:inline-flex gap-10">
            <Avatar
              reversed={true}
              title={authData?.name}
              image={authData?.profileImage}
              rounded="rounded-full"
              className="max-w-[300px] cursor-pointer"
              ref={profileMenuRef}
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            />

            <Popover
              target={profileMenuRef}
              open={profileMenuOpen}
              onClose={() => setProfileMenuOpen(false)}
              anchor={{ horizontal: "center" }}
              className="bg-paper rounded shadow-xl shadow-shadow"
            >
              <div className="text-lg flex flex-col w-72">
                <Link
                  className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary"
                  to={"/profile/" + authData?.id}
                >
                  <ProfileIcon size={24} />
                  Profile
                </Link>
                <span
                  className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? (
                    <>
                      <LightModeIcon size={24} />
                      Enable Light Mode
                    </>
                  ) : (
                    <>
                      <DarkModeIcon size={24} />
                      Enable Dark Mode
                    </>
                  )}
                </span>
                <span
                  className="inline-flex items-center gap-5 py-4 px-5 hover:bg-errorLighter text-error"
                  onClick={onLogout}
                >
                  <LogoutIcon size={24} />
                  Logout
                </span>
              </div>
            </Popover>
          </div>
        ) : (
          <>
            <button
              className="hidden xl:inline-block xl:ml-auto icon-btn-base rounded-full"
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <DarkModeIcon size={20} className="text-primary" />
              ) : (
                <LightModeIcon size={20} className="text-yellow-500" />
              )}
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
