import { useState } from "react";

function CommentBox({ onSubmit, defaultValue = "", onCancel }) {
  const [text, setText] = useState(defaultValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
    setText("");
  };

  const handleCancel = () => {
    setText("");
    onCancel?.();
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <textarea
        required
        className="p-4 w-full text-sm rounded-lg border border-slate-400 focus:ring-1 focus:ring-primary outline-none transition-all"
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
