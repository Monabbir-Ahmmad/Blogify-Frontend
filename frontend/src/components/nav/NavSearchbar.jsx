import { FiSearch as SearchIcon } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

function NavSearchbar({ className }) {
  return (
    <form className={twMerge("relative max-w-lg", className)}>
      <button
        type="submit"
        className="icon-btn-base text-slate-400 hover:text-slate-600 flex rounded-full absolute inset-y-0 left-0 items-center p-2.5 m-[2px]"
      >
        <SearchIcon size={20} />
      </button>
      <input
        type="search"
        id="main-search"
        className="w-full pl-14 pr-4 py-2.5 transition-all bg-slate-100 placeholder:text-slate-400 text-sm rounded-full outline-none focus:shadow-md"
        placeholder="Search"
        required
      />
    </form>
  );
}

export default NavSearchbar;
