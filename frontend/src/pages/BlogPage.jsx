import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  estimateReadingTime,
  extractTextFromHtml,
  getRandomImage,
} from "../utils/commonUtil";

import { AuthContext } from "../contexts/AuthContext";
import Avatar from "../components/common/avatar/Avatar";
import BlogFloatingButton from "../components/blog/BlogFloatingButton";
import { CommentContextProvider } from "../contexts/CommentContext";
import CommentPage from "./CommentPage";
import ConfirmationDialog from "../components/common/dialog/ConfirmationDialog";
import ErrorPage from "./ErrorPage";
import RichContentRenderer from "../components/common/richEditor/RichContentRenderer";
import dayjs from "dayjs";
import notFoundIcon from "../assets/notFound.svg";
import { toast } from "react-toastify";
import useBlogAction from "../hooks/useBlogAction";
import { useContext } from "react";
import { useModal } from "../contexts/ModalContext";

function BlogPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { isAuthenticated } = useContext(AuthContext);

  const [openComments, setOpenComments] = useSearchParams("comments", "open");

  const { fetchBlog, blogLikeMutation, blogDeleteMutation } = useBlogAction();

  const { data, isError } = fetchBlog(blogId);

  const onBlogLike = () => {
    if (!isAuthenticated) {
      return toast.info("You must be logged in to like a blog", {
        toastId: "login-to-like-blog",
      });
    }
    blogLikeMutation.mutate(blogId);
  };

  const onBlogEditClick = () => navigate(`/blog/edit/${blogId}`);

  const onBlogDelete = () =>
    openModal(
      <ConfirmationDialog
        type="danger"
        onConfirm={() => {
          blogDeleteMutation.mutate(blogId, {
            onSuccess: () => {
              toast.success("Blog deleted successfully");
              navigate("/");
            },
          });
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

  const toggleCommentView = () =>
    setOpenComments(
      openComments.get("comments") ? undefined : { comments: "open" }
    );

  if (isError)
    return (
      <ErrorPage
        image={notFoundIcon}
        title="Sorry, we couldn't find the blog you were looking for."
        description="It may have been deleted or you may have followed a bad link."
      />
    );

  return (
    <div className="p-5 relative">
      <CommentContextProvider>
        <CommentPage
          blogId={blogId}
          open={openComments.get("comments") === "open"}
          toggleCommentView={toggleCommentView}
        />
      </CommentContextProvider>
      <div className="flex flex-col items-center max-w-7xl mx-auto rounded-lg">
        <img
          src={data?.coverImage ?? getRandomImage(data?.id, { width: 1000 })}
          alt="Cover Image"
          className="w-full h-60 md:h-96 lg:rounded-lg rounded-t-lg object-cover"
        />
        <div className="flex flex-col bg-background w-full gap-6 p-4 pb-12 lg:-mt-28 max-w-5xl sm:p-10 sm:mx-12 lg:rounded-lg">
          <h1 className="text-2xl font-semibold sm:text-3xl">{data?.title}</h1>

          <Link to={"/profile/" + data?.user?.id} className="hover:underline">
            <Avatar
              image={data?.user.profileImage}
              rounded="rounded-full"
              title={data?.user.name}
              titleSize="text-lg"
            />
          </Link>

          <div className="inline-flex items-start sm:items-center gap-2 flex-col sm:flex-row bg-slate-50 dark:bg-neutral-800 border-l-4 border-divider p-4">
            <div className="flex flex-col gap-2">
              <p>
                <strong>Published</strong>{" "}
                {dayjs(data?.createdAt).format("DD MMMM, YYYY hh:mma")}
              </p>

              {data?.updatedAt !== data?.createdAt && (
                <p>
                  <strong>Updated</strong>{" "}
                  {dayjs(data?.updatedAt).format("DD MMMM, YYYY hh:mma")}
                </p>
              )}
            </div>

            <p className="sm:ml-auto font-semibold">
              {estimateReadingTime(extractTextFromHtml(data?.content))}
            </p>
          </div>

          <RichContentRenderer content={data?.content} />
        </div>
      </div>
      {data && (
        <BlogFloatingButton
          blog={data}
          onBlogLikeClick={onBlogLike}
          onBlogCommentClick={toggleCommentView}
          onBlogEditClick={onBlogEditClick}
          onBlogDeleteClick={onBlogDelete}
        />
      )}
    </div>
  );
}

export default BlogPage;
