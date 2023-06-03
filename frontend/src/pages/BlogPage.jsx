import {
  estimateReadingTime,
  extractTextFromHtml,
  getRandomImage,
} from "../utils/commonUtil";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import Avatar from "../components/common/avatar/avatar";
import BlogFloatingButton from "../components/blog/BlogFloatingButton";
import RichContentRenderer from "../components/common/richEditor/RichContentRenderer";
import blogService from "../services/blogService";
import dayjs from "dayjs";
import { toast } from "react-toastify";

function BlogPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { blogId } = useParams();

  const { data } = useQuery({
    enabled: !!blogId,
    queryKey: ["getBlog", blogId],
    queryFn: async () => await blogService.get(blogId),
  });

  const blogLikeMutation = useMutation({
    mutationKey: ["skipLoading"],
    mutationFn: blogService.like,
    onSuccess: (data) =>
      queryClient.setQueryData(["getBlog", blogId], () => data),
  });

  const blogDeleteMutation = useMutation({
    mutationFn: blogService.delete,
    onSuccess: () => {
      toast.success("Blog deleted successfully");
      queryClient.invalidateQueries(["getBlogs"]);
      queryClient.removeQueries(["getBlog", blogId]);
      navigate("..");
    },
  });

  const onBlogLike = () => blogLikeMutation.mutate(blogId);

  const onBlogCommentClick = () => {};

  const onBlogEditClick = () => navigate(`/blog/edit/${blogId}`);

  const onBlogDelete = () => blogDeleteMutation.mutate(blogId);

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
      <BlogFloatingButton
        blog={data}
        onBlogLikeClick={onBlogLike}
        onBlogCommentClick={onBlogCommentClick}
        onBlogEditClick={onBlogEditClick}
        onBlogDeleteClick={onBlogDelete}
      />
    </div>
  );
}

export default BlogPage;
