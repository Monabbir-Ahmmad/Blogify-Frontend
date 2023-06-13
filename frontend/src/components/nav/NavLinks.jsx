import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function NavLinks({ links = [] }) {
  return (
    <>
      {links.map(
        ({ to, icon: Icon, text, sideNavOnly }, index) =>
          !sideNavOnly && (
            <div key={text} className="inline-flex items-center">
              {index > 0 && (
                <div className="mx-8 inline-block h-full min-h-[1.3rem] border-r-2 border-divider"></div>
              )}
              <NavLink
                to={to}
                className={({ isActive }) =>
                  twMerge(
                    "inline-flex gap-2 transition-all py-2.5 px-5 hover:text-primary",
                    "nav-link after:bg-primary",
                    isActive && "text-primary nav-link-active"
                  )
                }
              >
                <Icon size={20} />
                <span>{text}</span>
              </NavLink>
            </div>
          )
      )}
    </>
  );
}

export default NavLinks;
