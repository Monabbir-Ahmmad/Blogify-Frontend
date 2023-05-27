import React from "react";
import avaterPlaceholder from "../../assets/avatar.svg";
import { twMerge } from "tailwind-merge";

function NavAvatar({
  image = avaterPlaceholder,
  title = "Example Name",
  subtitle = "example@email.com",
  reversed = false,
  className,
}) {
  return (
    <div
      className={twMerge(
        "flex items-center gap-4",
        reversed && "flex-row-reverse text-right",
        className
      )}
    >
      <img
        className="w-10 h-10 rounded-full object-cover bg-slate-100"
        src={image}
        alt={title}
      />
      <div className="font-semibold truncate">
        <div>{title}</div>
        <div className="text-sm opacity-70 truncate">{subtitle}</div>
      </div>
    </div>
  );
}

export default NavAvatar;
