import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import BlogWriteForm from "../components/blog/BlogWriteForm";
import ErrorPage from "./ErrorPage";
import forbiddenImg from "../assets/forbidden.svg";
import notFoundImg from "../assets/notFound.svg";
import { toast } from "react-toastify";
import useBlogAction from "../hooks/useBlogAction";
import { useContext } from "react";

function BlogEditPage() {
  const navagate = useNavigate();
  const { blogId } = useParams();
  const { authData } = useContext(AuthContext);

  const { fetchBlog, blogUpdateMutation } = useBlogAction();

  const { data: blogToUpdate, isError } = fetchBlog(blogId);

  const onSubmit = (data) =>
    blogUpdateMutation.mutate(
      { blogId, data },
      {
        onSuccess: () => {
          toast.success("Blog updated successfully");
          navagate(`/blog/${blogId}`);
        },
      }
    );

  if (isError)
    return (
      <ErrorPage
        image={notFoundImg}
        title="Sorry! We couldn't find the blog you are looking for."
        description="Please, make sure you have typed the correct URL."
      />
    );

  if (!authData?.id || blogToUpdate?.user?.id !== authData?.id)
    return (
      <ErrorPage
        image={forbiddenImg}
        title="Sorry! You are not allowed to edit this blog."
        description="Please, make sure you are logged in and have the permission to edit this blog."
      />
    );

  return (
    <main className="w-full p-4">
      <div className="max-w-5xl mx-auto">
        <BlogWriteForm
          onSubmit={onSubmit}
          isEditMode={true}
          defaultValues={blogToUpdate}
        />
      </div>
    </main>
  );
}

export default BlogEditPage;
