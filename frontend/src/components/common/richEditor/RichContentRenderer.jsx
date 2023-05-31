import "./RichContentRenderer.css";

import { twMerge } from "tailwind-merge";

function RichContentRenderer({ content, className, unstylized = false }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className={twMerge(className, unstylized ? "unstyled" : "rich-content")}
    ></div>
  );
}

export default RichContentRenderer;
