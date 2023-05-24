import { GiOverInfinity as Logo } from "react-icons/gi";
import { NavLink } from "react-router-dom";

function NavLogo({ className }) {
  return (
    <NavLink
      className={`text-3xl inline-flex items-center gap-2 ${className}`}
      to="/"
    >
      <Logo size={35} className="text-primary" />
      <span>Blogify</span>
    </NavLink>
  );
}

export default NavLogo;
