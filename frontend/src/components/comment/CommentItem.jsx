import {
  RiChat1Line as CommentIcon,
  RiDeleteBin6Line as DeleteIcon,
  RiEdit2Line as EditIcon,
  RiHeart2Line as LikeIcon,
  RiHeart2Fill as LikedIcon,
  RiMore2Fill as MoreIcon,
} from "react-icons/ri";
import { useContext, useRef, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import Avatar from "../common/avatar/avatar";
import CommentBox from "./CommentBox";
import Popover from "../common/popover/Popover";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";

dayjs.extend(relativeTime);

function CommentItem({
  comment,
  onLike,
  onViewReplies,
  onEdit,
  onDelete,
  onReply,
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const menuRef = useRef();
  const { authData } = useContext(AuthContext);

  const isLiked = comment?.likes?.some((like) => like?.userId === authData?.id);

  const onMenuClick = () => setMenuOpen((prev) => !prev);

  const onMenuClose = () => setMenuOpen(false);

  const onReplyClick = () => setOpenReply((prev) => !prev);

  const onCommentatorClick = () => navigate("/profile/" + comment.user.id);

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Avatar
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
          onClick={onMenuClick}
        >
          <MoreIcon size={20} />
        </button>

        <Popover
          target={menuRef}
          open={menuOpen}
          onClose={onMenuClose}
          className="bg-white rounded shadow"
        >
          <div className="text-lg flex flex-col w-44">
            <span className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary">
              <EditIcon size={24} />
              Edit
            </span>
            <span
              className="inline-flex items-center gap-5 py-4 px-5 hover:bg-errorLighter text-error"
              onClick={() => onDelete(comment.id)}
            >
              <DeleteIcon size={24} />
              Delete
            </span>
          </div>
        </Popover>
      </div>

      <p className="text-sm">{comment.text}</p>

      <div className="flex gap-2 [&>button]:btn-base [&>button]:rounded-full [&>button]:p-2 [&>button]:bg-transparent [&>button]:shadow-none">
        <button
          onClick={() => onLike(comment.id)}
          className={twMerge(isLiked && "text-primary")}
        >
          {isLiked ? <LikedIcon size={20} /> : <LikeIcon size={20} />}
          {comment.likes.length}
        </button>

        <button onClick={onReplyClick}>
          <CommentIcon size={20} />
          {openReply ? "Cancel reply" : "Reply"}
        </button>

        {comment.replyCount > 0 && (
          <button>View {comment.replyCount} replies</button>
        )}
      </div>

      {openReply && <CommentBox />}
    </div>
  );
}

export default CommentItem;
