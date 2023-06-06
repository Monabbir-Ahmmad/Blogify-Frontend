import { CommentContext } from "../../contexts/CommentContext";
import CommentItem from "./CommentItem";
import { twMerge } from "tailwind-merge";
import { useContext } from "react";

function CommentTree({ commentIds, level = 0 }) {
  const { comments } = useContext(CommentContext);

  if (!commentIds.length) return null;

  return (
    <div className={twMerge("divide-y", level > 0 && level < 4 && "ml-8")}>
      {commentIds.map(
        (commentId) =>
          comments[commentId] && (
            <div key={commentId} className="pt-6 mb-6">
              <CommentItem comment={comments[commentId]} level={level} />
            </div>
          )
      )}
    </div>
  );
}

export default CommentTree;
