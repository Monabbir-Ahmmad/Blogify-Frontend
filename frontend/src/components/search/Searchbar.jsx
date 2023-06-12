import { useEffect, useState } from "react";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";

import { RiSearchLine as SearchIcon } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

function Searchbar({ className }) {
  const navigate = useNavigate();
  const match = useMatch("/search/:keyword");
  const [searchParams] = useSearchParams({
    type: "blog",
  });
  const [search, setSearch] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${search}?type=${searchParams.get("type")}`);
  };

  useEffect(() => {
    setSearch(match?.params?.keyword || "");
  }, [match?.params?.keyword]);

  return (
    <form
      className={twMerge("relative max-w-lg", className)}
      onSubmit={onSubmit}
    >
      <button
        type="submit"
        className="icon-btn-base text-slate-400 hover:text-slate-600 dark:hover:text-slate-400 dark:text-slate-500 flex rounded-full absolute inset-y-0 left-0 items-center p-2.5 m-[2px]"
      >
        <SearchIcon size={20} />
      </button>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="search"
        className="w-full pl-14 pr-4 py-2.5 transition-all bg-slate-100 dark:bg-neutral-800 dark:placeholder:text-slate-500 placeholder:text-slate-400 text-sm rounded-full outline-none focus:shadow-md"
        placeholder="Search"
        required
      />
    </form>
  );
}

export default Searchbar;
