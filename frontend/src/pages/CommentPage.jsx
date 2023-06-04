import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import { RiCloseLine as CloseIcon } from "react-icons/ri";
import CommentBox from "../components/comment/CommentBox";
import CommentItem from "../components/comment/CommentItem";
import commentService from "../services/commentService";
import { twMerge } from "tailwind-merge";
import { useRef } from "react";

function CommentPage({ blogId, toggleCommentView, open = false }) {
  const commentSectionRef = useRef();

  const { data: paginatedData } = useInfiniteQuery({
    queryKey: ["comments", blogId],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await commentService.getListByBlog(blogId, {
        page: pageParam,
        limit: 12,
      });
      return data;
    },

    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.pageCount > pages.length) return pages.length;
    },
  });

  const commentCreateMutation = useMutation({
    mutationFn: async (text) => {
      await commentService.post(blogId, text);
    },
  });

  const onClickOutside = (e) => {
    if (
      commentSectionRef.current &&
      !commentSectionRef.current.contains(e.target)
    ) {
      toggleCommentView();
    }
  };

  const onCommentSubmit = (text) => commentCreateMutation.mutate(text);

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
          "float-right h-screen gap-5 flex flex-col w-full sm:w-5/6 sm:max-w-lg p-6 bg-white transition-transform",
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

        {paginatedData?.data?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </section>
    </div>
  );
}

export default CommentPage;
