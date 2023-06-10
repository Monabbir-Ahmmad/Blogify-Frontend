import BlogWriteForm from "../components/blog/BlogWriteForm";
import { toast } from "react-toastify";
import useBlogAction from "../hooks/useBlogAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function BlogWritingPage() {
  const navigate = useNavigate();
  const [resetForm, setResetForm] = useState(false);

  const { blogCreateMutation } = useBlogAction();

  const onSubmit = (data) =>
    blogCreateMutation.mutate(data, {
      onSuccess: (blog) => {
        toast.success("Blog created successfully");
        setResetForm(true);
        navigate(`/blog/${blog.id}`);
      },
    });

  return (
    <div className="w-full p-4">
      <div className="max-w-5xl mx-auto">
        <BlogWriteForm
          onSubmit={onSubmit}
          resetForm={resetForm}
          onFormReset={() => setResetForm(false)}
        />
      </div>
    </div>
  );
}

export default BlogWritingPage;
