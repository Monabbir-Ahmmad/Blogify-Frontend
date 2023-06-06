import { useMutation, useQueryClient } from "@tanstack/react-query";

import BlogWriteForm from "../components/blog/BlogWriteForm";
import blogService from "../services/blogService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function BlogWritingPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [resetForm, setResetForm] = useState(false);

  const blogCreateMutation = useMutation({
    mutationFn: blogService.post,
    onSuccess: (data) => {
      toast.success("Blog created successfully");
      queryClient.invalidateQueries("getBlogs");
      setResetForm(true);
      navigate(`/blog/${data.id}`);
    },
  });

  const onSubmit = (data) => blogCreateMutation.mutate(data);

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
