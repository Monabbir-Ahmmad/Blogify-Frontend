import BlogWriteForm from "../components/writer/BlogWriteForm";
import { useMutation } from "@tanstack/react-query";
import blogService from "../services/blogService";
import { toast } from "react-toastify";
import { useState } from "react";

function WritePage() {
  const [resetForm, setResetForm] = useState(false);

  const blogCreateMutation = useMutation({
    mutationFn: blogService.post,
    onSuccess: () => {
      toast.success("Blog created successfully");
      setResetForm(true);
    },
  });

  const onSubmit = (data) => blogCreateMutation.mutate(data);

  return (
    <div className="w-full p-4">
      <div className="max-w-4xl mx-auto">
        <BlogWriteForm
          onSubmit={onSubmit}
          resetForm={resetForm}
          onFormReset={() => setResetForm(false)}
        />
      </div>
    </div>
  );
}

export default WritePage;
