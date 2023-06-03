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
} from "../utils/commonUtil";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "../contexts/AuthContext";
import Avatar from "../components/common/avatar/avatar";
import RichContentRenderer from "../components/common/richEditor/RichContentRenderer";
import blogService from "../services/blogService";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { useContext } from "react";
import { useParams } from "react-router-dom";

function BlogPage() {
  const queryClient = useQueryClient();
  const { blogId } = useParams();
  const { authData } = useContext(AuthContext);

  const { data } = useQuery({
    enabled: !!blogId,
    queryKey: ["getBlog", blogId],
    queryFn: async () => await blogService.get(blogId),
  });

  const blogLikeMutation = useMutation({
    mutationKey: ["skipLoading"],
    mutationFn: blogService.like,
    onSuccess: (data) => {
      queryClient.setQueryData(["getBlog", blogId], () => data);
    },
  });

  const onBlogLike = () => blogLikeMutation.mutate(blogId);

  const isLiked = data?.likes?.some((like) => like?.userId === authData?.id);

  return (
    <div className="p-5 sm:p-10">
      <div className="flex flex-col items-center max-w-5xl mx-auto rounded-lg mb-14">
        <img
          src={data?.coverImage ?? getRandomImage(data?.id, { width: 1000 })}
          alt=""
          className="w-full h-72 sm:h-96 bg-gray-500 sm:rounded-lg rounded-t-lg object-cover"
        />
        <div className="flex flex-col bg-white w-full gap-6 p-6 pb-12 -mt-16 max-w-4xl sm:p-10 sm:mx-12 rounded-lg">
          <Avatar
            rounded="rounded-full"
            title={data?.user.name}
            titleSize="text-lg"
          />
          <h1 className="text-2xl font-semibold sm:text-3xl">{data?.title}</h1>

          <div className="inline-flex items-center bg-slate-50 border-l-4 border-slate-300 p-4">
            <span>
              <strong>Published</strong>{" "}
              {dayjs(data?.createdAt).format("DD MMMM, YYYY hh:mma")}
              <br />
              {data?.updatedAt !== data?.createdAt && (
                <>
                  <strong>Updated</strong>{" "}
                  {dayjs(data?.updatedAt).format("DD MMMM, YYYY hh:mma")}
                </>
              )}
            </span>

            <span className="ml-auto font-semibold">
              {estimateReadingTime(extractTextFromHtml(data?.content))}
            </span>
          </div>

          <RichContentRenderer content={data?.content} />
        </div>
      </div>

      <div className="bg-white overflow-hidden z-10 shadow-lg border fixed bottom-0 left-0 w-full sm:w-fit sm:bottom-5 sm:left-1/2 sm:-translate-x-1/2 sm:rounded-full divide-x-2 [&>button]:bg-white [&>button]:rounded-none [&>button]:shadow-none [&>button]:btn-base [&>button]:text-lg flex [&>button]:flex-1">
        <button
          className={twMerge(isLiked && "text-primary")}
          onClick={onBlogLike}
        >
          {isLiked ? <LikedIcon size={26} /> : <LikeIcon size={26} />}
          {data?.likes?.length}
        </button>
        <button>
          <MoreIcon size={26} />
        </button>
        <button>
          <CommentIcon size={26} />
          {data?.commentCount}
        </button>
      </div>
    </div>
  );
}

export default BlogPage;
