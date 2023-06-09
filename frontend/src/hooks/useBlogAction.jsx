import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import blogService from "../services/blogService";

function useBlogAction() {
  const queryClient = useQueryClient();

  const fetchBlog = (blogId) =>
    useQuery({
      enabled: !!blogId,
      queryKey: ["getBlog", blogId],
      queryFn: async () => await blogService.get(blogId),
    });

  const fetchBlogs = ({ page, limit }) =>
    useQuery({
      queryKey: ["getBlogs", { page, limit }],
      queryFn: async () => await blogService.getList({ page, limit }),
    });

  const fetchUserBlogs = (userId, { page, limit }) =>
    useQuery({
      enabled: !!userId,
      queryKey: ["getUserBlogs", { userId, page, limit }],
      queryFn: async () =>
        await blogService.getListByUser(userId, { page, limit }),
    });

  const blogCreateMutation = useMutation({
    mutationFn: blogService.post,
    onSuccess: () => {
      queryClient.removeQueries("getBlogs");
    },
  });

  const blogLikeMutation = useMutation({
    mutationKey: ["skipLoading"],
    mutationFn: blogService.like,
    onSuccess: (data, blogId) => {
      queryClient.removeQueries("getBlogs");
      queryClient.setQueryData(["getBlog", blogId], () => data);
    },
  });

  const blogUpdateMutation = useMutation({
    mutationFn: async ({ blogId, data }) =>
      await blogService.update(blogId, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["getBlog", variables.blogId], () => data);
      queryClient.removeQueries(["getUserBlogs", { userId: variables.userId }]);
      queryClient.removeQueries(["getBlogs"]);
    },
  });

  const blogDeleteMutation = useMutation({
    mutationFn: blogService.delete,
    onSuccess: (_, blogId) => {
      queryClient.removeQueries(["getBlogs"]);
      queryClient.removeQueries(["getBlog", blogId]);
      queryClient.removeQueries(["getUserBlogs"]);
    },
  });

  return {
    fetchBlog,
    fetchBlogs,
    fetchUserBlogs,
    blogCreateMutation,
    blogUpdateMutation,
    blogLikeMutation,
    blogDeleteMutation,
  };
}

export default useBlogAction;
