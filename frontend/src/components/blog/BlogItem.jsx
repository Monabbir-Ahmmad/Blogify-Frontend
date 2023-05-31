import {
  FiHeart as LikeIcon,
  FiMoreVertical as MoreIcon,
} from "react-icons/fi";
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
    e.stopPropagation();
    setMenuOpen(false);
  };

  return (
    <div
      onClick={onBlogClick}
      className="relative cursor-pointer flex flex-col justify-between gap-3 w-full h-96 rounded-3xl bg-white shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex p-2 gap-2 justify-between z-10">
        <button
          className={twMerge(
            "flex gap-2 rounded-full",
            isLiked
              ? "btn-primary"
              : "btn-base bg-white hover:bg-primaryLighter hover:text-primary"
          )}
          onClick={onLikeClick}
        >
          <LikeIcon size={20} />
          <p>
            {blog?.likes?.length ?? 0}{" "}
            {blog?.likes?.length > 1 ? "likes" : "like"}
          </p>
        </button>

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
            {blog?.commentCount ?? 0}{" "}
            {blog?.commentCount > 1 ? "comments" : "comment"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
