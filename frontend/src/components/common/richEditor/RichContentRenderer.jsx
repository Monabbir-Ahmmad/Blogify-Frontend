import "./RichContentRenderer.css";

import { twMerge } from "tailwind-merge";

function RichContentRenderer({ content, className }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className={twMerge("sun-editor-content-renderer", className)}
    ></div>
  );
}

export default RichContentRenderer;
