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
import Avatar from "../common/avatar/avatar";
import Popover from "../common/popover/Popover";
import RichContentRenderer from "../common/richEditor/RichContentRenderer";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";

function BlogItem({ blog, onEditClick, onDeleteClick }) {
  const navigate = useNavigate();
  const menuRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const { authData } = useContext(AuthContext);

  const isLiked = blog?.likes?.some((like) => like?.userId === authData?.id);

  const onBlogClick = (e) => {
    navigate("/blog/" + blog?.id);
  };

  const onAuthorClick = (e) => {
    e.stopPropagation();
    navigate("/profile/" + blog?.user?.id);
  };

  const onMenuClick = (e) => {
    setMenuOpen((prev) => !prev);
  };

  const onMenuClose = (e) => {
    setMenuOpen(false);
  };

  return (
    <div className="relative flex flex-col justify-between gap-3 w-full h-96 rounded-3xl bg-white shadow-md hover:shadow-lg transition-shadow">
      <div className="flex p-2 gap-2 justify-between z-10">
        <div className="inline-flex items-center divide-x-2 rounded-full bg-white shadow-md">
          <span
            className={twMerge(
              "inline-flex items-center gap-2 p-2",
              isLiked && "text-primary"
            )}
          >
            {isLiked ? <LikedIcon size={18} /> : <LikeIcon size={18} />}
            {blog?.likes?.length}
          </span>
          <span className="inline-flex items-center gap-2 p-2">
            <CommentIcon size={18} />
            {blog?.commentCount}
          </span>
        </div>
        {authData?.id === blog?.user?.id && (
          <>
            <button
              ref={menuRef}
              className="icon-btn-base bg-white rounded-full h-10"
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
                <span
                  className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary"
                  onClick={() => onEditClick(blog.id)}
                >
                  <EditIcon size={24} />
                  Edit
                </span>
                <span
                  className="inline-flex items-center gap-5 py-4 px-5 hover:bg-errorLighter text-error"
                  onClick={() => onDeleteClick(blog.id)}
                >
                  <DeleteIcon size={24} />
                  Delete
                </span>
              </div>
            </Popover>
          </>
        )}
      </div>

      <img
        src={blog?.coverImage ?? getRandomImage(blog.id, { width: 600 })}
        alt={blog?.title}
        className="absolute inset-x-0 top-0 w-full h-3/5 object-cover rounded-t-3xl z-0"
      />

      <div
        onClick={onBlogClick}
        className="group cursor-pointer overflow-hidden flex flex-col gap-4 p-6 z-0 bg-white rounded-3xl"
      >
        <h1 className="text-base font-semibold min-h-[4.5em] line-clamp-3">
          {blog?.title}
        </h1>

        <RichContentRenderer
          className="h-0 opacity-0 transition-[height_opacity] duration-500 group-hover:h-[6.25em] group-hover:opacity-70 line-clamp-5"
          unstylized={true}
          content={blog?.content}
        />

        <div className="flex gap-2 justify-between items-end">
          <Avatar
            title={blog?.user?.name}
            subtitle={dayjs(blog?.createdAt).format("DD MMM, YYYY hh:mma")}
            image={blog?.user?.profileImage}
            className="hover:underline flex-[2]"
            onClick={onAuthorClick}
          />

          <span className="text-sm opacity-70 font-semibold text-end flex-1">
            {estimateReadingTime(extractTextFromHtml(blog?.content))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
