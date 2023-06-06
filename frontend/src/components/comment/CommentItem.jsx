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
import Avatar from "../common/avatar/avatar";
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
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openReplyInput, setOpenReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  const menuRef = useRef();
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
    { page: 1, limit: 5 }
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

  const onLikeClick = () => commentLikeMutation.mutate(comment.id);

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
  }, [showReplies]);

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

        <button
          ref={menuRef}
          className="icon-btn-base bg-white rounded-full h-8"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <MoreIcon size={20} />
        </button>

        <Popover
          target={menuRef}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          className="bg-white rounded shadow"
        >
          <div className="text-lg flex flex-col w-44">
            <span
              className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary"
              onClick={() => setShowEditInput(true)}
            >
              <EditIcon size={24} />
              Edit
            </span>
            <span
              className="inline-flex items-center gap-5 py-4 px-5 hover:bg-errorLighter text-error"
              onClick={onDeleteClick}
            >
              <DeleteIcon size={24} />
              Delete
            </span>
          </div>
        </Popover>
      </div>

      {showEditInput ? (
        <CommentBox
          defaultValue={comment.text}
          onSubmit={onEditSubmit}
          onCancel={() => setShowEditInput(false)}
        />
      ) : (
        <p>{comment.text}</p>
      )}

      <div className="flex gap-2 [&>button]:btn-base [&>button]:rounded-full [&>button]:p-2 [&>button]:bg-transparent [&>button]:shadow-none">
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
            {showReplies
              ? "Hide replies"
              : `View ${comment.replyCount} ${
                  comment.replyCount > 1 ? "replies" : "reply"
                }`}
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
        <CommentTree commentIds={comment.children} level={level + 1} />
      )}
    </div>
  );
}

export default CommentItem;
