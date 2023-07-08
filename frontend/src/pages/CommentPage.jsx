import { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { RiCloseLine as CloseIcon } from "react-icons/ri";
import CommentBox from "../components/comment/CommentBox";
import { CommentContext } from "../contexts/CommentContext";
import CommentTree from "../components/comment/CommentTree";
import NoResult from "../components/emptyPlaceholder/NoResult";
import { twMerge } from "tailwind-merge";
import useCommentAction from "../hooks/useCommentAction";

function CommentPage({ blogId, toggleCommentView, open = false }) {
  const commentSectionRef = useRef();
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
  const { isAuthenticated } = useContext(AuthContext);
  const { comments } = useContext(CommentContext);
  const { fetchComments, commentPostMutation } = useCommentAction(
    useContext(CommentContext)
  );

  const { data: paginatedData, refetch: refetchComments } = fetchComments(
    blogId,
    pagination
  );

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

  const onCommentSubmit = (text) =>
    commentPostMutation.mutate({ blogId, text });

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
      refetchComments();
    } else if (!open) {
      document.body.classList.remove("no-scroll");
    }
  }, [open, pagination]);

  return (
    <main
      data-testid="comment-page"
      className={twMerge(
        "z-50 fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50 transition-opacity",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClickOutside}
    >
      <section
        ref={commentSectionRef}
        className={twMerge(
          "overflow-y-auto float-right h-screen w-full sm:w-5/6 sm:max-w-2xl bg-paper transition-transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="w-full inline-flex items-center p-6 sticky top-0 bg-paper z-10">
          <h1 className="text-xl font-semibold">Comments</h1>

          <button
            data-testid="close-button"
            className="ml-auto icon-btn-base"
            onClick={toggleCommentView}
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 py-3">
          {isAuthenticated && <CommentBox onSubmit={onCommentSubmit} />}

          {open && !!paginatedData?.data?.length && (
            <CommentTree commentIds={comments.root.children} />
          )}

          {open && !paginatedData?.data?.length && (
            <NoResult
              title="No Comments Yet!!!"
              subtitle="Be the first person to comment"
            />
          )}

          <button
            className="btn-base w-full py-2 mt-2"
            onClick={() =>
              setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
            }
            style={{
              display: pagination.page >= paginatedData?.totalPages && "none",
            }}
          >
            Load{" "}
            {Math.min(
              paginatedData?.pageSize,
              paginatedData?.totalItems -
                pagination.page * paginatedData?.pageSize
            )}{" "}
            more
          </button>
        </div>
      </section>
    </main>
  );
}

export default CommentPage;
