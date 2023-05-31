import avaterPlaceholder from "../../assets/avatar.svg";
import { twMerge } from "tailwind-merge";

function BlogAuthor({
  image = avaterPlaceholder,
  title,
  subtitle,
  reversed = false,
  rounded = "rounded-xl",
  avatarSize = "h-10",
  titleSize = "text-sm",
  subtitleSize = "text-xs",
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
        className={twMerge(
          "object-cover bg-slate-100 aspect-square",
          rounded,
          avatarSize
        )}
        src={image}
        alt={title}
      />
      <div className="font-semibold truncate">
        <h3 className={twMerge("truncate", titleSize)}>{title}</h3>
        <h6 className={twMerge("truncate", subtitleSize)}>{subtitle}</h6>
      </div>
    </div>
  );
}

export default BlogAuthor;
