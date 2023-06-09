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
import Popover from "../common/popover/Popover";
import { twMerge } from "tailwind-merge";

function BlogFloatingButton({
  blog,
  onBlogLikeClick,
  onBlogCommentClick,
  onBlogEditClick,
  onBlogDeleteClick,
}) {
  const menuRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const { authData } = useContext(AuthContext);

  const isLiked = blog?.likes?.some((like) => like?.userId === authData?.id);

  const onMenuClick = () => setMenuOpen((prev) => !prev);

  const onMenuClose = () => setMenuOpen(false);

  return (
    <>
      <div className="bg-paper overflow-hidden z-10 shadow-lg shadow-shadow border border-divider sticky bottom-5 rounded-lg left-0 w-full sm:w-fit sm:left-1/2 sm:-translate-x-1/2 divide-x-2 divide-divider [&>button]:bg-paper [&>button]:rounded-none [&>button]:shadow-none [&>button]:btn-base [&>button]:text-lg flex [&>button]:flex-1">
        <button
          data-testid="like-button"
          className={twMerge(isLiked && "text-primary")}
          onClick={onBlogLikeClick}
        >
          {isLiked ? <LikedIcon size={26} /> : <LikeIcon size={26} />}
          {blog?.likes?.length}
        </button>
        {blog?.user.id === authData?.id && (
          <button data-testid="menu-button" ref={menuRef} onClick={onMenuClick}>
            <MoreIcon size={26} />
          </button>
        )}
        <button data-testid="comment-button" onClick={onBlogCommentClick}>
          <CommentIcon size={26} />
          {blog?.commentCount}
        </button>
      </div>
      <Popover
        target={menuRef}
        open={menuOpen}
        onClose={onMenuClose}
        anchor={{
          horizontal: "center",
        }}
        className="text-sm flex flex-col w-44 bg-paper rounded shadow-xl shadow-shadow"
      >
        <span
          role="menuitem"
          className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary"
          onClick={() => onBlogEditClick(blog.id)}
        >
          <EditIcon size={20} />
          Edit
        </span>
        <span
          role="menuitem"
          className="inline-flex items-center gap-5 py-4 px-5 hover:bg-errorLighter text-error"
          onClick={() => onBlogDeleteClick(blog.id)}
        >
          <DeleteIcon size={20} />
          Delete
        </span>
      </Popover>
    </>
  );
}

export default BlogFloatingButton;
