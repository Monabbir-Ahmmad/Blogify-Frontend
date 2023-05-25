import { GiOverInfinity as Logo } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function AppLogo({ className, size = 35 }) {
  return (
    <NavLink
      className={twMerge("text-3xl inline-flex items-center gap-2", className)}
      to="/"
    >
      <Logo size={size} className="text-primary" />
      <span>Blogify</span>
    </NavLink>
  );
}

export default AppLogo;
