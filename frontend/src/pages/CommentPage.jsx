import { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { RiCloseLine as CloseIcon } from "react-icons/ri";
import CommentBox from "../components/comment/CommentBox";
import { CommentContext } from "../contexts/CommentContext";
import CommentTree from "../components/comment/CommentTree";
import { twMerge } from "tailwind-merge";
import useCommentAction from "../hooks/useCommentAction";

function CommentPage({ blogId, toggleCommentView, open = false }) {
  const [page, setPage] = useState(1);
  const limit = 12;
  const commentSectionRef = useRef();
  const { isAuthenticated } = useContext(AuthContext);

  const { comments } = useContext(CommentContext);

  const { fetchComments, commentPostMutation } = useCommentAction(
    useContext(CommentContext)
  );

  const { data: paginatedData, refetch: refetchComments } = fetchComments(
    blogId,
    { page, limit }
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
      refetchComments();
    }
  }, [open]);

  return (
    <main
      className={twMerge(
        "z-50 fixed inset-0 bg-black bg-opacity-25 transition-opacity",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClickOutside}
    >
      <section
        ref={commentSectionRef}
        className={twMerge(
          "overflow-y-auto float-right h-screen gap-5 flex flex-col w-full sm:w-5/6 sm:max-w-2xl p-6 bg-white transition-transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="inline-flex items-center mb-4">
          <h1 className="text-xl font-semibold">Comments</h1>

          <button className="ml-auto icon-btn-base" onClick={toggleCommentView}>
            <CloseIcon size={20} />
          </button>
        </div>

        {isAuthenticated && <CommentBox onSubmit={onCommentSubmit} />}

        {open && <CommentTree commentIds={comments.root.children} />}
      </section>
    </main>
  );
}

export default CommentPage;
