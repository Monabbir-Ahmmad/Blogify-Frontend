import { useState } from "react";

function CommentBox({ onSubmit, defaultValue = "" }) {
  const [text, setText] = useState(defaultValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
    setText("");
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
      <button
        type="submit"
        className="btn-primary py-2"
        disabled={!text.trim()}
      >
        Submit
      </button>
    </form>
  );
}

export default CommentBox;
