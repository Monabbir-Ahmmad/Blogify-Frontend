import {
  RiChat1Line as CommentIcon,
  RiDeleteBin6Line as DeleteIcon,
  RiEdit2Line as EditIcon,
  RiHeart2Line as LikeIcon,
  RiHeart2Fill as LikedIcon,
  RiMore2Fill as MoreIcon,
} from "react-icons/ri";
import { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import Avatar from "../common/avatar/Avatar";
import CommentBox from "./CommentBox";
import { CommentContext } from "../../contexts/CommentContext";
import CommentTree from "./CommentTree";
import ConfirmationDialog from "../common/dialog/ConfirmationDialog";
import Popover from "../common/popover/Popover";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import useCommentAction from "../../hooks/useCommentAction";
import { useModal } from "../../contexts/ModalContext";
import { useNavigate } from "react-router-dom";

dayjs.extend(relativeTime);

function CommentItem({ comment, level }) {
  const menuRef = useRef();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  const [openReplyInput, setOpenReplyInput] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
  const { authData, isAuthenticated } = useContext(AuthContext);
  const {
    fetchReplies,
    replyPostMutation,
    commentLikeMutation,
    commentDeleteMutation,
    commentEditMutation,
  } = useCommentAction(useContext(CommentContext));

  const { data: paginatedData, refetch: refetchReplies } = fetchReplies(
    comment.id,
    pagination
  );

  const isLiked = comment?.likes?.some((like) => like?.userId === authData?.id);

  const onReplySubmit = (text) =>
    replyPostMutation.mutate(
      {
        text,
        parentId: comment.id,
        blogId: comment.blogId,
      },
      {
        onSuccess: () => {
          setShowReplies(true);
          setOpenReplyInput(false);
        },
      }
    );

  const onCommentatorClick = () => navigate("/profile/" + comment.user.id);

  const onToggleRepliesClick = () => setShowReplies((prev) => !prev);

  const onLikeClick = () => {
    if (!isAuthenticated)
      return toast.info("Please login to like a comment.", {
        toastId: "login-to-like-comment",
      });
    commentLikeMutation.mutate(comment.id);
  };

  const onEditSubmit = (text) => {
    commentEditMutation.mutate(
      { commentId: comment.id, text },
      {
        onSuccess: () => {
          setShowEditInput(false);
          toast.success("Comment edited successfully!");
        },
      }
    );
  };

  const onDeleteClick = () =>
    openModal(
      <ConfirmationDialog
        type="danger"
        onConfirm={() => {
          commentDeleteMutation.mutate(comment.id, {
            onSuccess: () => toast.success("Comment deleted successfully!"),
          });
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

  useEffect(() => {
    if (showReplies) refetchReplies();
  }, [showReplies, pagination]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Avatar
          className={"cursor-pointer hover:underline"}
          image={comment.user.profileImage}
          rounded="rounded-full"
          title={comment.user.name}
          subtitle={`${dayjs(comment.createdAt).fromNow()}${
            comment.updatedAt !== comment.createdAt ? " (edited)" : ""
          }`}
          onClick={onCommentatorClick}
        />

        {authData?.id === comment.user.id && (
          <button
            ref={menuRef}
            className="icon-btn rounded-full h-8"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <MoreIcon size={20} />
          </button>
        )}

        <Popover
          target={menuRef}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          className="text-sm flex flex-col w-44 bg-paper shadow-shadow rounded shadow-xl"
        >
          <span
            className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary"
            onClick={() => setShowEditInput(true)}
          >
            <EditIcon size={20} />
            Edit
          </span>
          <span
            className="inline-flex items-center gap-5 py-4 px-5 hover:bg-errorLighter text-error"
            onClick={onDeleteClick}
          >
            <DeleteIcon size={20} />
            Delete
          </span>
        </Popover>
      </div>

      {showEditInput ? (
        <CommentBox
          defaultValue={comment.text}
          onSubmit={onEditSubmit}
          onCancel={() => setShowEditInput(false)}
        />
      ) : (
        <p className="whitespace-pre-wrap text-sm">{comment.text}</p>
      )}

      <div className="flex gap-2 [&>button]:btn-text [&>button]:rounded-full [&>button]:p-2">
        <button
          onClick={onLikeClick}
          className={twMerge(isLiked && "text-primary")}
        >
          {isLiked ? <LikedIcon size={20} /> : <LikeIcon size={20} />}
          {comment.likes.length}
        </button>

        {isAuthenticated && (
          <button onClick={() => setOpenReplyInput(true)}>
            <CommentIcon size={20} />
            Reply
          </button>
        )}

        {comment.replyCount > 0 && (
          <button onClick={onToggleRepliesClick}>
            {showReplies ? "Hide replies" : "View replies"}
          </button>
        )}
      </div>

      {openReplyInput && (
        <CommentBox
          onSubmit={onReplySubmit}
          onCancel={() => setOpenReplyInput(false)}
        />
      )}

      {showReplies && (
        <>
          <CommentTree commentIds={comment.children} level={level + 1} />

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
        </>
      )}
    </div>
  );
}

export default CommentItem;
