import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import commentService from "../services/commentService";

function useCommentAction({ setComments }) {
  const queryClient = useQueryClient();

  const fetchComments = (blogId, { page = 1, limit = 12 }) =>
    useQuery({
      enabled: false,
      queryKey: ["getComments", { blogId, page, limit }],
      queryFn: async () => {
        const { data, pageCount } = await commentService.getListByBlog(blogId, {
          page,
          limit,
        });
        setComments((prev) => {
          const newComments = { ...prev };
          newComments.root.children = [
            ...new Set([
              ...newComments.root.children,
              ...data.map((comment) => comment.id),
            ]),
          ];

          data.forEach((comment) => {
            newComments[comment.id] = { ...comment, children: [] };
          });

          return newComments;
        });
        return { data, pageCount };
      },
    });

  const fetchReplies = (commentId, { page = 1, limit = 12 }) =>
    useQuery({
      enabled: false,
      queryKey: ["getReplies", { commentId, page, limit }],
      queryFn: async () => {
        const { data, pageCount } = await commentService.getReplies(commentId, {
          page,
          limit,
        });
        setComments((prev) => {
          const newComments = { ...prev };
          newComments[commentId].children = [
            ...new Set([
              ...newComments[commentId].children,
              ...data.map((comment) => comment.id),
            ]),
          ];

          data.forEach((comment) => {
            newComments[comment.id] = { ...comment, children: [] };
          });

          return newComments;
        });
        return { data, pageCount };
      },
    });

  const commentPostMutation = useMutation({
    mutationFn: async ({ blogId, text }) =>
      await commentService.post(blogId, text),
    onSuccess: (data, { blogId }) => {
      setComments((prev) => {
        const newComments = { ...prev };
        newComments.root.children = [data.id, ...newComments.root.children];
        newComments[data.id] = { ...data, children: [] };
        return newComments;
      });
      queryClient.invalidateQueries(["getBlog", blogId]);
    },
  });

  const replyPostMutation = useMutation({
    mutationFn: async ({ blogId, parentId, text }) =>
      await commentService.post(blogId, text, parentId),
    onSuccess: (data, variables) => {
      setComments((prev) => {
        const newComments = { ...prev };
        newComments[variables.parentId].children = [
          data.id,
          ...newComments[variables.parentId].children,
        ];
        newComments[variables.parentId].replyCount++;
        newComments[data.id] = { ...data, children: [] };
        return newComments;
      });

      // queryClient.invalidateQueries([
      //   "getReplies",
      //   { commentId: variables.parentId },
      // ]);
    },
  });

  const commentLikeMutation = useMutation({
    mutationKey: ["skipLoading"],
    mutationFn: commentService.like,
    onSuccess: (data, commentId) => {
      setComments((prev) => {
        const newComments = { ...prev };
        newComments[commentId] = { ...newComments[commentId], ...data };
        return newComments;
      });
      queryClient.removeQueries(["getComments"]);
      queryClient.removeQueries(["getReplies"]);
    },
  });

  const commentDeleteMutation = useMutation({
    mutationFn: commentService.delete,
    onSuccess: (data, commentId) => {
      setComments((prev) => {
        const newComments = { ...prev };
        delete newComments[commentId];

        if (data.parentId) newComments[data.parentId].replyCount--;

        return newComments;
      });
      queryClient.invalidateQueries(["getBlog", data.blogId]);
      queryClient.removeQueries("getComments");
      queryClient.removeQueries("getReplies");
    },
  });

  const commentEditMutation = useMutation({
    mutationFn: async ({ commentId, text }) =>
      await commentService.update(commentId, text),
    onSuccess: (data, variables) => {
      setComments((prev) => {
        const newComments = { ...prev };
        newComments[variables.commentId] = {
          ...newComments[variables.commentId],
          ...data,
        };
        return newComments;
      });
      queryClient.removeQueries("getComments");
      queryClient.removeQueries("getReplies");
    },
  });

  return {
    fetchComments,
    fetchReplies,
    commentPostMutation,
    replyPostMutation,
    commentLikeMutation,
    commentDeleteMutation,
    commentEditMutation,
  };
}

export default useCommentAction;
