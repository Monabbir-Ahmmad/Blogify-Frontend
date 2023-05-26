import {
  FiHome as HomeIcon,
  FiUser as ProfileIcon,
  FiFeather as WriteIcon,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function NavLinks({ userId }) {
  return (
    <>
      <NavLink
        to="/write"
        className={({ isActive }) =>
          twMerge(
            "inline-flex gap-2 transition",
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
            "inline-flex gap-2 transition",
            isActive ? "text-primary" : "text-gray-500 hover:text-gray-700"
          )
        }
      >
        <HomeIcon size={20} />
        <span>Home</span>
      </NavLink>
      <span>|</span>
      <NavLink
        to={"/profile/" + userId}
        className={({ isActive }) =>
          twMerge(
            "inline-flex gap-2 transition",
            isActive ? "text-primary" : "text-gray-500 hover:text-gray-700"
          )
        }
      >
        <ProfileIcon size={20} />
        <span>Profile</span>
      </NavLink>
    </>
  );
}

export default NavLinks;
