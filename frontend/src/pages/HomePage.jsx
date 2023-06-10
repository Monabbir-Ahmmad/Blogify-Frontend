import BlogItem from "../components/blog/BlogItem";
import NoResult from "../components/emptyPlaceholder/NoResult";
import Pagination from "../components/common/pagination/Pagination";
import useBlogAction from "../hooks/useBlogAction";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const limit = searchParams.get("limit") || 12;
  const { fetchBlogs } = useBlogAction();

  const { data: paginatedData } = fetchBlogs({
    page: searchParams.get("page"),
    limit,
  });

  return (
    <main className="p-5 w-full inline-flex justify-center">
      <section className="container space-y-5">
        <h1 className="text-4xl font-semibold">
          Welcome to <span className="text-primary">Blogify</span>
        </h1>

        <p className="text-base opacity-80 uppercase">Latest Blogs</p>

        <hr />

        {paginatedData?.data.length === 0 && <NoResult />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedData?.data.map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
        </div>

        <div className="py-4">
          <Pagination
            currentPage={searchParams.get("page")}
            totalPages={paginatedData?.totalPages}
            onPageChange={(page) => setSearchParams({ page })}
          />
        </div>
      </section>
    </main>
  );
}

export default HomePage;
