import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import commentService from "../services/commentService";
import { toast } from "react-toastify";
import { useState } from "react";

function useCommentAction({ blogId }) {
  const queryClient = useQueryClient();
  const [comments, setComments] = useState(new Map());

  const fetchComments = (blogId, { page, limit }) =>
    useQuery({
      enabled: !!blogId,
      queryKey: ["getComments", { blogId, page, limit }],
      queryFn: async ({ page, limit }) => {
        const { data, pageCount } = await commentService.getListByBlog(blogId, {
          page,
          limit,
        });
        setComments(
          (prev) => new Map([...prev, ...data.map((c) => [c.id, c])])
        );
        return { data, pageCount };
      },
    });

  const commentCreateMutation = useMutation({
    mutationFn: async (text) => await commentService.post(blogId, text),
    onSuccess: (data) => {
      setComments((prev) => new Map([[data.id, data], ...prev]));
      queryClient.invalidateQueries(["getBlog", blogId]);
    },
  });

  const commentLikeMutation = useMutation({
    mutationKey: ["skipLoading"],
    mutationFn: commentService.like,
    onSuccess: (data, id) => {
      setComments((prev) => new Map(prev).set(id, data));
      queryClient.setQueryData(["getComments", { blogId }], (oldData) =>
        new Map(oldData).set(id, data)
      );
    },
  });

  const commentDeleteMutation = useMutation({
    mutationFn: commentService.delete,
    onSuccess: (data, id) => {
      toast.success("Comment deleted successfully");
      setComments((prev) => {
        const newComments = new Map(prev);
        newComments.delete(id);
        return newComments;
      });
      queryClient.invalidateQueries(["getBlog", blogId]);
    },
  });
  return {
    comments,
    fetchComments,
    commentCreateMutation,
    commentLikeMutation,
    commentDeleteMutation,
  };
}

export default useCommentAction;
