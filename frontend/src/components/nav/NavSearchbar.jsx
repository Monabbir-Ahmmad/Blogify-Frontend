import { FiSearch as SearchIcon } from "react-icons/fi";

function NavSearchbar({ className }) {
  return (
    <form className={`relative max-w-lg ${className}`}>
      <button
        type="submit"
        className="icon-btn-base flex absolute inset-y-0 left-0 items-center p-2.5 m-[2px]"
      >
        <SearchIcon size={20} />
      </button>
      <input
        type="text"
        id="main-search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent w-full pl-14 pr-4 py-2.5"
        placeholder="Search"
        required
      />
    </form>
  );
}

export default NavSearchbar;
