import { useNavigate, useParams } from "react-router-dom";

import BlogWriteForm from "../components/blog/BlogWriteForm";
import { toast } from "react-toastify";
import useBlogAction from "../hooks/useBlogAction";
import { useState } from "react";

function BlogEditPage() {
  const navagate = useNavigate();
  const { blogId } = useParams();
  const [resetForm, setResetForm] = useState(false);

  const { fetchBlog, blogUpdateMutation } = useBlogAction();

  const { data: blogToUpdate } = fetchBlog(blogId);

  const onSubmit = (data) =>
    blogUpdateMutation.mutate(
      { blogId, data },
      {
        onSuccess: () => {
          toast.success("Blog updated successfully");
          setResetForm(true);
          navagate(`/blog/${blogId}`);
        },
      }
    );

  return (
    <div className="w-full p-4">
      <div className="max-w-5xl mx-auto">
        <BlogWriteForm
          onSubmit={onSubmit}
          resetForm={resetForm}
          onFormReset={() => setResetForm(false)}
          isEditMode={true}
          defaultValues={blogToUpdate}
        />
      </div>
    </div>
  );
}

export default BlogEditPage;
