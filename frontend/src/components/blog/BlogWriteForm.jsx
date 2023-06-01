import { Controller, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import FileDrop from "../common/input/FileDrop";
import Input from "../common/input/Input";
import { RiUpload2Line as PublishIcon } from "react-icons/ri";
import RichEditor from "../common/richEditor/RichEditor";
import { toast } from "react-toastify";

function BlogWriteForm({ onSubmit, resetForm, onFormReset }) {
  const { control, handleSubmit, reset } = useForm();
  const editorRef = useRef();
  const [coverImage, setCoverImage] = useState();

  useEffect(() => {
    if (resetForm) {
      resetFields();
      onFormReset();
    }
  }, [resetForm]);

  const onCoverImageChange = (file) => setCoverImage(file);

  const onFormSubmit = (data) => {
    if (!editorRef.current.getCharCount()) {
      toast.error("Blog content is required", {
        toastId: "Blog content is required",
      });
      return;
    }

    onSubmit({ ...data, content: editorRef.current.getContents(), coverImage });
  };

  const resetFields = () => {
    reset();
    editorRef.current.setContents("");
    setCoverImage(null);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col gap-6 p-4"
    >
      <div className="flex gap-4 items-center justify-between">
        <h1 className="text-3xl font-semibold">Write a new blog</h1>
        <button type="submit" className="btn-primary px-10">
          Publish <PublishIcon size={20} />
        </button>
      </div>

      <FileDrop onChange={onCoverImageChange} value={coverImage} />

      <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{
          validate: (value) => !!value.trim() || "Title is required",
          maxLength: {
            value: 200,
            message: "Title must be between 1 to 200 characters",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="text"
            placeholder="Enter your title"
            className="text-3xl bg-transparent border-0 border-b-8 focus:ring-0"
            error={error}
            helperText={error?.message}
          />
        )}
      />

      <RichEditor ref={editorRef} />
    </form>
  );
}

export default BlogWriteForm;
