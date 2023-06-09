import { Controller, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import FileDrop from "../common/input/FileDrop";
import Input from "../common/input/Input";
import { RiUpload2Line as PublishIcon } from "react-icons/ri";
import RichEditor from "../common/richEditor/RichEditor";
import { toast } from "react-toastify";

function BlogWriteForm({ onSubmit, isEditMode = false, defaultValues }) {
  const { control, handleSubmit, reset } = useForm();
  const editorRef = useRef();
  const [coverImage, setCoverImage] = useState();

  useEffect(() => {
    if (!defaultValues) return;

    editorRef.current.setContents(defaultValues.content);
    setCoverImage(defaultValues.coverImage);
    reset({
      title: defaultValues?.title,
    });
  }, [defaultValues]);

  const onCoverImageChange = (file) => setCoverImage(file);

  const onFormSubmit = (data) => {
    if (!editorRef.current.getCharCount()) {
      toast.error("Blog content is required", {
        toastId: "Blog content is required",
      });
      return;
    }

    onSubmit({
      title: data.title,
      content: editorRef.current.getContents(),
      coverImage,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col gap-6 p-4"
    >
      <div className="flex flex-col gap-4 items-center justify-between md:flex-row">
        <h1 className="text-3xl font-semibold">
          {isEditMode ? "Edit your blog" : "Write a new blog"}
        </h1>
        <button type="submit" className="btn-primary px-10 w-full md:w-fit">
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
            className="input-primary text-3xl border-0 border-b-8 focus:ring-0"
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
