import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import BlogItem from "../components/blog/BlogItem";
import blogService from "../services/blogService";
import { useState } from "react";

function HomePage() {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
  });

  const { data: paginatedData } = useQuery({
    queryKey: ["getBlogs", pagination],
    queryFn: async () => await blogService.getList(pagination),
  });

  const blogLikeMutation = useMutation({
    mutationKey: ["skipLoading"],
    mutationFn: blogService.like,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["getBlogs", pagination], (oldData) => ({
        ...oldData,
        data: oldData.data.map((blog) => (blog.id === data.id ? data : blog)),
      }));
    },
  });

  const onBlogLike = (blogId) => blogLikeMutation.mutate(blogId);

  return (
    <section className="p-5 w-full inline-flex justify-center">
      <div className="max-w-7xl w-full space-y-5">
        <h1 className="text-4xl font-semibold">
          Welcome to <span className="text-primary">Blogify</span>
        </h1>

        <p className="text-base opacity-80 uppercase">View recent blogs</p>

        <hr />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedData?.data.map((blog) => (
            <BlogItem key={blog.id} blog={blog} onLike={onBlogLike} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
