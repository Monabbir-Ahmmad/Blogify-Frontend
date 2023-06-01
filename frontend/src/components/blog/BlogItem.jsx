import {
  RiChat1Line as CommentIcon,
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

function BlogItem({ blog }) {
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
    e.stopPropagation();
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
            subtitle={dayjs(blog?.createdAt).format("DD MMM, YYYY, hh:mm a")}
            image={blog?.user?.profileImage}
            className="hover:underline w-fit"
            onClick={onAuthorClick}
          />

          <span className="text-sm opacity-70 font-semibold">
            {estimateReadingTime(extractTextFromHtml(blog?.content))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
