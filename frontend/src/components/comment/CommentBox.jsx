import { useEffect, useRef, useState } from "react";

import TextArea from "../common/input/TextArea";

function CommentBox({ onSubmit, defaultValue = "", onCancel }) {
  const [text, setText] = useState(defaultValue);
  const ref = useRef();

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
    ref.current?.scrollIntoView({ behavior: "smooth" });

    return () => {
      ref.current = null;
    };
  }, []);

  return (
    <form className="space-y-2" onSubmit={handleSubmit} ref={ref}>
      <TextArea
        required
        className="input-primary"
        placeholder="Write a comment..."
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
      </div>
    </form>
  );
}

export default CommentBox;
