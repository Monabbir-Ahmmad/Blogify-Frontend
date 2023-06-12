import {
  RiFilePaper2Line as BlogIcon,
  RiAccountCircleLine as UserIcon,
} from "react-icons/ri";
import { Link, useParams, useSearchParams } from "react-router-dom";

import BlogItem from "../components/blog/BlogItem";
import NoResult from "../components/emptyPlaceholder/NoResult";
import Pagination from "../components/common/pagination/Pagination";
import UserSearchItem from "../components/search/UserSearchItem";
import { twMerge } from "tailwind-merge";
import useSearchAction from "../hooks/useSearchAction";

function SearchPage() {
  const { keyword } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    type: "blog",
    page: 1,
  });
  const limit = searchParams.get("limit") || 12;
  const { fetchSearchResult } = useSearchAction();

  const { data: searchResult } = fetchSearchResult({
    keyword,
    type: searchParams.get("type"),
    page: searchParams.get("page"),
    limit,
  });

  return (
    <main className="p-5 w-full inline-flex justify-center">
      <section className="container space-y-5">
        <h1 className="text-4xl font-semibold">
          Search results for <span className="text-primary">{keyword}</span>
        </h1>

        <div className="flex justify-center border-b border-divider text-base font-semibold sm:justify-start">
          <Link
            to={`/search/${keyword}?type=blog`}
            className={twMerge(
              "inline-flex items-center justify-center w-full sm:w-fit py-4 px-8 gap-2 border-b-4 border-transparent hover:text-primary hover:border-divider transition-all",
              searchParams.get("type") === "blog" &&
                "border-primary text-primary hover:border-primary"
            )}
          >
            <BlogIcon size={20} />
            Blogs
          </Link>
          <Link
            to={`/search/${keyword}?type=user`}
            className={twMerge(
              "inline-flex items-center justify-center w-full sm:w-fit py-4 px-8 gap-2 border-b-4 border-transparent hover:text-primary hover:border-divider transition-all",
              searchParams.get("type") === "user" &&
                "border-primary text-primary hover:border-primary"
            )}
          >
            <UserIcon size={20} />
            Users
          </Link>
        </div>

        {searchResult?.data.length === 0 && <NoResult />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchParams.get("type") === "blog" &&
            searchResult?.data.map((blog) => (
              <BlogItem key={blog.id} blog={blog} />
            ))}

          {searchParams.get("type") === "user" &&
            searchResult?.data.map((user) => (
              <UserSearchItem key={user.id} user={user} />
            ))}
        </div>

        <div className="py-4">
          <Pagination
            currentPage={searchParams.get("page")}
            totalPages={searchResult?.totalPages}
            onPageChange={(page) => setSearchParams({ page })}
          />
        </div>
      </section>
    </main>
  );
}

export default SearchPage;
