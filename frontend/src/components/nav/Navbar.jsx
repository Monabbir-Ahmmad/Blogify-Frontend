import {
  FiHome as HomeIcon,
  FiUser as ProfileIcon,
  FiFeather as WriteIcon,
} from "react-icons/fi";
import { FiLogOut as LogoutIcon, FiMenu as MenuIcon } from "react-icons/fi";
import { useContext, useState } from "react";

import AppLogo from "../common/AppLogo";
import { AuthContext } from "../../contexts/AuthContext";
import NavAvatar from "./NavAvatar";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import NavSearchbar from "./NavSearchbar";
import SideNav from "./SideNav";

function Navbar({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-slate-200 w-full gap-2 p-4 inline-flex items-center bg-white">
        <AppLogo className="mr-4" />

        <NavSearchbar className="hidden sm:block" userId={authData?.id} />

        <div className="hidden text-base absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 xl:flex mx-auto items-center w-auto">
          <NavLinks links={links} />
        </div>

        {isAuthenticated ? (
          <div className="hidden ml-auto xl:inline-flex gap-10">
            <NavAvatar
              reversed={true}
              title={authData?.name}
              subtitle={authData?.email}
              image={authData?.profileImage}
              className={"max-w-[300px]"}
            />

            <button
              className="inline-flex gap-2 btn-primary rounded-full"
              onClick={onLogout}
            >
              <span>Logout</span>
              <LogoutIcon size={20} />
            </button>
          </div>
        ) : (
          <>
            <NavLink
              className="hidden xl:inline-block xl:ml-auto btn-base  rounded-full"
              to="/signin"
            >
              Sign In
            </NavLink>
            <NavLink
              className="hidden xl:inline-block btn-primary  rounded-full"
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
