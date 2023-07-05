import { AuthContext } from "../contexts/AuthContext";
import BlogWriteForm from "../components/blog/BlogWriteForm";
import ErrorPage from "./ErrorPage";
import loginRequiredImg from "../assets/loginRequired.svg";
import { toast } from "react-toastify";
import useBlogAction from "../hooks/useBlogAction";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function BlogWritingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const { blogCreateMutation } = useBlogAction();

  const onSubmit = (data) =>
    blogCreateMutation.mutate(data, {
      onSuccess: (blog) => {
        toast.success("Blog created successfully");
        navigate(`/blog/${blog.id}`);
      },
    });

  if (!isAuthenticated)
    return (
      <ErrorPage
        image={loginRequiredImg}
        title="You need to login to access this page"
        description="Please login to continue"
        linkText="Go to login page"
        linkTo="/signin"
      />
    );

  return (
    <div className="w-full p-4">
      <div className="max-w-5xl mx-auto">
        <BlogWriteForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default BlogWritingPage;
