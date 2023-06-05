import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";

import { RiCloseLine as CloseIcon } from "react-icons/ri";
import CommentBox from "../components/comment/CommentBox";
import CommentItem from "../components/comment/CommentItem";
import ConfirmationDialog from "../components/common/dialog/ConfirmationDialog";
import commentService from "../services/commentService";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { useModal } from "../components/common/modal/ModalService";

function CommentPage({ blogId, toggleCommentView, open = false }) {
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  const [comments, setComments] = useState(new Map());
  const [page, setPage] = useState(1);
  const limit = 12;
  const commentSectionRef = useRef();

  useQuery({
    enabled: !!blogId,
    queryKey: ["getComments", { blogId, page, limit }],
    queryFn: async () => {
      const { data, pageCount } = await commentService.getListByBlog(blogId, {
        page,
        limit,
      });
      setComments((prev) => new Map([...prev, ...data.map((c) => [c.id, c])]));
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

  const onClickOutside = (e) => {
    const commentRect = commentSectionRef.current?.getBoundingClientRect();

    const isInsideCommentSection =
      commentRect &&
      e.clientX >= commentRect.left &&
      e.clientX <= commentRect.right &&
      e.clientY >= commentRect.top &&
      e.clientY <= commentRect.bottom;

    if (!isInsideCommentSection) {
      toggleCommentView();
    }
  };

  const onCommentSubmit = (text) => commentCreateMutation.mutate(text);

  const onCommentLike = (commentId) => commentLikeMutation.mutate(commentId);

  const onCommentDelete = (commentId) =>
    openModal(
      <ConfirmationDialog
        type="danger"
        onConfirm={() => {
          commentDeleteMutation.mutate(commentId);
          closeModal();
        }}
        onCancel={closeModal}
        title="Delete Comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        className="max-w-lg w-full"
      />
    );

  return (
    <div
      className={twMerge(
        "z-50 fixed inset-0 bg-black bg-opacity-25 transition-opacity",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClickOutside}
    >
      <section
        ref={commentSectionRef}
        className={twMerge(
          "overflow-y-auto float-right h-screen gap-5 flex flex-col w-full sm:w-5/6 sm:max-w-lg p-6 bg-white transition-transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="inline-flex items-center mb-4">
          <h1 className="text-xl font-semibold">Comments</h1>

          <button className="ml-auto icon-btn-base" onClick={toggleCommentView}>
            <CloseIcon size={20} />
          </button>
        </div>

        <CommentBox onSubmit={onCommentSubmit} />

        <div className="divide-y">
          {[...comments.keys()].map(
            (commentId) =>
              !comments.get(commentId)?.parentId && (
                <div key={commentId} className="py-6">
                  <CommentItem
                    comment={comments.get(commentId)}
                    onDelete={onCommentDelete}
                    onLike={onCommentLike}
                  />
                </div>
              )
          )}
        </div>
      </section>
    </div>
  );
}

export default CommentPage;
