import BlogItem from "../components/blog/blogItem";
import blogService from "../services/blogService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function HomePage() {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
  });

  const { data } = useQuery({
    queryKey: ["getBlogs", pagination.page, pagination.limit],
    queryFn: async () => await blogService.getList(pagination),
  });

  return (
    <section className="p-5 w-full inline-flex justify-center">
      <div className="max-w-6xl w-full space-y-5">
        <h1 className="text-4xl font-semibold">
          Welcome to <span className="text-primary">Blogify</span>
        </h1>

        <p className="text-base opacity-80 uppercase">View recent blogs</p>

        <hr />

        <div className="grid grid-cols-3 gap-4">
          {data?.data.map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
