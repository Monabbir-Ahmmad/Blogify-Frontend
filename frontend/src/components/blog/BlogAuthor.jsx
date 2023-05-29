import avaterPlaceholder from "../../assets/avatar.svg";
import { twMerge } from "tailwind-merge";

function BlogAuthor({
  image = avaterPlaceholder,
  title,
  subtitle,
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
        className="w-10 h-10 rounded-xl object-cover bg-slate-100"
        src={image}
        alt={title}
      />
      <div className="font-semibold truncate">
        <h3 className="text-sm truncate">{title}</h3>
        <h6 className="text-xs opacity-70 truncate">{subtitle}</h6>
      </div>
    </div>
  );
}

export default BlogAuthor;
