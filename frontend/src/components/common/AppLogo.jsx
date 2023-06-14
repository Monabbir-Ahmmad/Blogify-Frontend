import { Link } from "react-router-dom";
import logo from "/logo.svg";
import { twMerge } from "tailwind-merge";

function AppLogo({ className, size = 35, hideText = false }) {
  return (
    <Link
      className={twMerge(
        "text-3xl inline-flex items-center gap-2 text-primary fill-primary",
        className
      )}
      to="/"
    >
      <object
        type="image/svg+xml"
        data={logo}
        style={{
          height: size,
        }}
      />
      {!hideText && <span>Blogify</span>}
    </Link>
  );
}

export default AppLogo;
