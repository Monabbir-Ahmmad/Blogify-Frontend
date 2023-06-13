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

function NavProfileMenu({ onLogout }) {
  const menuRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { authData } = useContext(AuthContext);

  return (
    <>
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
    </>
  );
}

export default NavProfileMenu;
