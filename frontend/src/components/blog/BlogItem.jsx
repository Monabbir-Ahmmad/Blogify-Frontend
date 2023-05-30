import {
  FiHeart as LikeIcon,
  FiMoreVertical as MoreIcon,
} from "react-icons/fi";

import BlogAuthor from "./BlogAuthor";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import RichContentRenderer from "../common/richEditor/RichContentRenderer";
import { useNavigate } from "react-router-dom";

function BlogItem({ blog }) {
  const navigate = useNavigate();
  const onBlogClick = (e) => {
    navigate("/blog/" + blog?.id);
  };

  const onAuthorClick = (e) => {
    e.stopPropagation();
    navigate("/profile/" + blog?.user?.id);
  };

  return (
    <div
      onClick={onBlogClick}
      className="relative cursor-pointer flex flex-col gap-3 w-full h-80 rounded-3xl bg-white shadow-md hover:shadow-lg transition-all"
    >
      <button className="absolute icon-btn-base bg-white top-4 right-4 rounded-full z-10">
        <MoreIcon size={20} />
      </button>

      <button className="absolute icon-btn-base group bg-white hover:bg-primaryLighter hover:text-primary flex gap-4 top-4 left-4 z-10 rounded-full">
        <LikeIcon size={20} />
        <p className="hidden group-hover:block">
          {blog?.likes?.length ?? 0}{" "}
          {blog?.likes?.length > 1 ? "likes" : "like"}
        </p>
      </button>

      <img
        src={
          blog?.coverImage ??
          `https://picsum.photos/seed/abstract=${blog?.id}/500/300`
        }
        alt={blog?.title}
        className="absolute inset-x-0 top-0 w-full h-3/5 object-cover rounded-t-3xl z-0"
      />

      <div className="flex flex-col gap-4 p-6 mt-auto z-10 bg-white rounded-3xl">
        <h1 className="text-base font-semibold">{blog?.title}</h1>

        <RichContentRenderer
          className="!text-sm !opacity-70 !min-h-[3em] ![&>*]:text-ellipsis !line-clamp-2"
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

          <span className="text-sm opacity-70 mt-auto">
            {blog?.commentCount ?? 0}{" "}
            {blog?.commentCount > 1 ? "comments" : "comment"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
