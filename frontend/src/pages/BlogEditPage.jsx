import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import BlogWriteForm from "../components/blog/BlogWriteForm";
import blogService from "../services/blogService";
import { toast } from "react-toastify";
import { useState } from "react";

function BlogEditPage() {
  const navagate = useNavigate();
  const { blogId } = useParams();
  const queryClient = useQueryClient();
  const [resetForm, setResetForm] = useState(false);

  const { data: blogToUpdate } = useQuery({
    enabled: !!blogId,
    queryKey: ["getBlog", blogId],
    queryFn: async () => await blogService.get(blogId),
  });

  const blogUpdateMutation = useMutation({
    mutationFn: async ({ blogId, data }) =>
      await blogService.update(blogId, data),
    onSuccess: () => {
      toast.success("Blog updated successfully");
      queryClient.removeQueries(["getBlog", blogId]);
      queryClient.invalidateQueries(["getBlogs"]);
      setResetForm(true);
      navagate(`/blog/${blogId}`);
    },
  });

  const onSubmit = (data) => blogUpdateMutation.mutate({ blogId, data });

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
