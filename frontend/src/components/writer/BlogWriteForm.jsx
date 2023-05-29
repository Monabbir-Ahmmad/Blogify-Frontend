import FileDrop from "../common/input/FileDrop";
import Input from "../common/input/Input";
import React from "react";
import RichEditor from "../common/input/RichEditor";

function BlogWriteForm() {
  return (
    <div className="flex flex-col gap-6">
      <Input type="text" placeholder="Enter your title" className="text-2xl" />

      <FileDrop />

      <RichEditor />
    </div>
  );
}

export default BlogWriteForm;
