import {
  RiChat1Line as CommentIcon,
  RiDeleteBin6Line as DeleteIcon,
  RiEdit2Line as EditIcon,
  RiHeart2Line as LikeIcon,
  RiHeart2Fill as LikedIcon,
  RiMore2Fill as MoreIcon,
} from "react-icons/ri";
import {
  estimateReadingTime,
  extractTextFromHtml,
  getRandomImage,
} from "../../utils/commonUtil";
import { useContext, useRef, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import Avatar from "../common/avatar/Avatar";
import ConfirmationDialog from "../common/dialog/ConfirmationDialog";
import Popover from "../common/popover/Popover";
import RichContentRenderer from "../common/richEditor/RichContentRenderer";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import useBlogAction from "../../hooks/useBlogAction";
import { useModal } from "../../contexts/ModalContext";
import { useNavigate } from "react-router-dom";

function BlogItem({ blog }) {
  const navigate = useNavigate();
  const menuRef = useRef();
  const { openModal, closeModal } = useModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const { authData } = useContext(AuthContext);
  const { blogDeleteMutation } = useBlogAction();

  const isLiked = blog?.likes?.some((like) => like?.userId === authData?.id);

  const onEditClick = () => navigate(`/blog/edit/${blog?.id}`);

  const onDeleteClick = () =>
    openModal(
      <ConfirmationDialog
        type="danger"
        onConfirm={() => {
          blogDeleteMutation.mutate(blog?.id);
          closeModal();
        }}
        onCancel={closeModal}
        title="Delete Blog"
        description="Are you sure you want to delete this blog? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        className="max-w-lg w-full"
      />
    );

  const onBlogClick = () => {
    navigate("/blog/" + blog?.id);
  };

  const onAuthorClick = (e) => {
    e.stopPropagation();
    navigate("/profile/" + blog?.user?.id);
  };

  const onMenuClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const onMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <div className="relative flex flex-col justify-between gap-3 w-full h-80 rounded-3xl bg-paper shadow-md shadow-shadow hover:shadow-lg transition-shadow">
      <div className="flex p-2 gap-2 justify-between z-10">
        <div className="py-1 inline-flex items-center divide-x-2 divide-divider rounded-full bg-paper shadow-md shadow-shadow">
          <span
            className={twMerge(
              "inline-flex items-center gap-2 px-2",
              isLiked && "text-primary"
            )}
          >
            {isLiked ? <LikedIcon size={18} /> : <LikeIcon size={18} />}
            {blog?.likes?.length}
          </span>
          <span className="inline-flex items-center gap-2 px-2">
            <CommentIcon size={18} />
            {blog?.commentCount}
          </span>
        </div>
        {authData?.id === blog?.user?.id && (
          <button
            data-testid="menu-button"
            ref={menuRef}
            className="icon-btn-base bg-paper rounded-full h-8"
            onClick={onMenuClick}
          >
            <MoreIcon size={20} />
          </button>
        )}

        <Popover
          target={menuRef}
          open={menuOpen}
          onClose={onMenuClose}
          className="text-sm flex flex-col w-44 bg-paper rounded shadow-xl shadow-shadow"
        >
          <span
            role="menuitem"
            className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary"
            onClick={onEditClick}
          >
            <EditIcon size={20} />
            Edit
          </span>
          <span
            role="menuitem"
            className="inline-flex items-center gap-5 py-4 px-5 hover:bg-errorLighter text-error"
            onClick={onDeleteClick}
          >
            <DeleteIcon size={20} />
            Delete
          </span>
        </Popover>
      </div>

      <img
        src={blog?.coverImage ?? getRandomImage(blog.id, { width: 600 })}
        alt={blog?.title}
        className="absolute inset-x-0 top-0 w-full h-3/5 object-cover rounded-t-3xl z-0"
      />

      <div
        data-testid="blog-item-click-area"
        onClick={onBlogClick}
        className="group cursor-pointer overflow-hidden flex flex-col gap-4 p-6 z-0 bg-paper rounded-3xl"
      >
        <h1 className="text-base font-semibold min-h-[3em] line-clamp-2">
          {blog?.title}
        </h1>

        <RichContentRenderer
          className="h-0 opacity-0 transition-[height_opacity] duration-500 group-hover:h-[5em] group-hover:opacity-70 line-clamp-4"
          unstylized={true}
          content={blog?.content}
        />

        <div className="flex gap-2 justify-between items-end">
          <Avatar
            title={blog?.user?.name}
            subtitle={dayjs(blog?.createdAt).format("DD MMM, YYYY hh:mma")}
            image={blog?.user?.profileImage}
            className="hover:underline w-8/12"
            onClick={onAuthorClick}
          />

          <span className="text-sm opacity-70 font-semibold text-end">
            {estimateReadingTime(extractTextFromHtml(blog?.content))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
