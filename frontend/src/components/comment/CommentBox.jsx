import { useEffect, useRef, useState } from "react";

import TextArea from "../common/input/TextArea";

function CommentBox({
  onSubmit,
  onCancel,
  defaultValue = "",
  maxLength = 500,
}) {
  const [text, setText] = useState(defaultValue);
  const ref = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
    setText("");
  };

  const handleCancel = () => {
    setText("");
    onCancel?.();
  };

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });

    return () => {
      ref.current = null;
    };
  }, []);

  return (
    <form className="space-y-2" onSubmit={handleSubmit} ref={ref}>
      <TextArea
        name="commentBox"
        required
        className="input-primary"
        placeholder="Write a comment..."
        maxLength={maxLength}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="btn-primary py-2"
          disabled={!text.trim()}
        >
          Submit
        </button>

        <button type="button" className="btn-base py-2" onClick={handleCancel}>
          Cancel
        </button>

        <p className="ml-auto text-xs opacity-70">
          {text.length} / {maxLength}
        </p>
      </div>
    </form>
  );
}

export default CommentBox;
