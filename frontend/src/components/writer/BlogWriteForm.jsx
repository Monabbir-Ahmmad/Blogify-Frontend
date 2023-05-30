import FileDrop from "../common/input/FileDrop";
import Input from "../common/input/Input";
import React from "react";
import RichEditor from "../common/richEditor/RichEditor";

function BlogWriteForm() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex gap-4 items-center justify-between">
        <h1 className="text-3xl font-semibold">Write a new blog</h1>
        <button className="btn-primary px-10">Publish</button>
      </div>
      <FileDrop />
      <Input
        type="text"
        placeholder="Enter your title"
        className="text-3xl bg-transparent border-0 border-b-8 focus:ring-0"
      />
      <RichEditor />
    </div>
  );
}

export default BlogWriteForm;
