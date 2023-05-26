import { Link } from "react-router-dom";
import { GiOverInfinity as Logo } from "react-icons/gi";
import { twMerge } from "tailwind-merge";

function AppLogo({ className, size = 35, hideText = false }) {
  return (
    <Link
      className={twMerge("text-3xl inline-flex items-center gap-2", className)}
      to="/"
    >
      <Logo size={size} className="text-primary" />
      {!hideText && <span className="text-primary">Blogify</span>}
    </Link>
  );
}

export default AppLogo;
