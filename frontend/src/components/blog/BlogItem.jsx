import {
  RiChat1Line as CommentIcon,
  RiHeart2Line as LikeIcon,
  RiHeart2Fill as LikedIcon,
  RiMore2Fill as MoreIcon,
} from "react-icons/ri";
import {
  estimateReadingTime,
  extractTextFromHtml,
} from "../../utils/commonUtil";
import { useContext, useRef, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import BlogAuthor from "./BlogAuthor";
import Popover from "../common/popover/Popover";
import ReactTimeAgo from "react-time-ago";
import RichContentRenderer from "../common/richEditor/RichContentRenderer";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";

function BlogItem({ blog, onLike }) {
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

  const onLikeClick = (e) => {
    e.stopPropagation();
    onLike(blog?.id);
  };

  const onMenuClick = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const onMenuClose = (e) => {
    setMenuOpen(false);
  };

  return (
    <div
      onClick={onBlogClick}
      className="relative cursor-pointer flex flex-col justify-between gap-3 w-full h-96 rounded-3xl bg-white shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex p-2 gap-2 justify-between z-10">
        <div className="inline-flex items-center divide-x-2 rounded-full bg-white">
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

        <button
          ref={menuRef}
          className="icon-btn-base relative bg-white rounded-full h-10"
          onClick={onMenuClick}
        >
          <MoreIcon size={20} />
          <Popover
            target={menuRef}
            open={menuOpen}
            onClose={onMenuClose}
          ></Popover>
        </button>
      </div>

      <img
        src={
          blog?.coverImage ??
          `https://picsum.photos/seed/abstract=${blog?.id}/500/300`
        }
        alt={blog?.title}
        className="absolute inset-x-0 top-0 w-full h-3/5 object-cover rounded-t-3xl z-0"
      />

      <div className="group overflow-hidden flex flex-col gap-4 p-6 z-0 bg-white rounded-3xl">
        <h1 className="text-base font-semibold min-h-[4.5em] line-clamp-3">
          {blog?.title}
        </h1>

        <RichContentRenderer
          className="h-0 opacity-0 transition-[height_opacity] duration-500 group-hover:h-[6.25em] group-hover:opacity-70 line-clamp-5"
          unstylized={true}
          content={blog?.content}
        />

        <div className="flex gap-2 justify-between">
          <div className="hover:underline w-fit" onClick={onAuthorClick}>
            <BlogAuthor
              title={blog?.user?.name}
              subtitle={
                <ReactTimeAgo date={new Date(blog?.createdAt)} locale="en-US" />
              }
              image={blog?.user?.profileImage}
            />
          </div>

          <span className="text-sm opacity-70 mt-auto font-semibold">
            {estimateReadingTime(extractTextFromHtml(blog?.content))} min read
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
