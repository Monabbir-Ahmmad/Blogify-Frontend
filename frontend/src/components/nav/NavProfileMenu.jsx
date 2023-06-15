import {
  RiMoonClearLine as DarkModeIcon,
  RiSunLine as LightModeIcon,
  RiLogoutCircleRLine as LogoutIcon,
  RiUser6Line as ProfileIcon,
} from "react-icons/ri";
import { useContext, useRef, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import Avatar from "../common/avatar/Avatar";
import { Link } from "react-router-dom";
import Popover from "../common/popover/Popover";
import { ThemeContext } from "../../contexts/ThemeContext";
import { twMerge } from "tailwind-merge";

function NavProfileMenu({ onLogout, className }) {
  const menuRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { authData } = useContext(AuthContext);

  const ThemeIcon = darkMode ? LightModeIcon : DarkModeIcon;

  return (
    <div className={twMerge("hidden xl:inline-flex gap-10", className)}>
      <Avatar
        reversed={true}
        title={authData?.name}
        image={authData?.profileImage}
        rounded="rounded-full"
        className="max-w-[300px] cursor-pointer"
        ref={menuRef}
        onClick={() => setMenuOpen((prev) => !prev)}
      />

      <Popover
        target={menuRef}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        className=" text-sm flex flex-col w-64 bg-paper rounded shadow-xl shadow-shadow"
      >
        <Link
          className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary"
          to={"/profile/" + authData?.id}
        >
          <ProfileIcon size={20} />
          Profile
        </Link>
        <span
          className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary"
          onClick={toggleDarkMode}
        >
          <ThemeIcon size={20} />
          Enable {darkMode ? "Light" : "Dark"} Mode
        </span>
        <span
          className="inline-flex items-center gap-5 py-4 px-5 hover:bg-errorLighter text-error"
          onClick={onLogout}
        >
          <LogoutIcon size={20} />
          Logout
        </span>
      </Popover>
    </div>
  );
}

export default NavProfileMenu;
