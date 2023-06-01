import avaterPlaceholder from "../../../assets/avatar.svg";
import { twMerge } from "tailwind-merge";

function Avatar({
  image = avaterPlaceholder,
  title,
  subtitle,
  reversed = false,
  rounded = "rounded-xl",
  avatarSize = "h-10",
  titleSize = "text-sm",
  subtitleSize = "text-xs",
  className,
  ...rest
}) {
  return (
    <div
      className={twMerge(
        "flex items-center gap-4",
        reversed && "flex-row-reverse text-right",
        className
      )}
      {...rest}
    >
      <img
        className={twMerge(
          "object-cover bg-slate-100 aspect-square",
          rounded,
          avatarSize
        )}
        src={image}
        alt={title}
      />
      <div className="font-semibold truncate">
        {title && <h5 className={twMerge("truncate", titleSize)}>{title}</h5>}
        {subtitle && (
          <h6 className={twMerge("truncate opacity-70", subtitleSize)}>
            {subtitle}
          </h6>
        )}
      </div>
    </div>
  );
}

export default Avatar;
