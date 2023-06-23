import "./suneditor-contents.css";

import { removeHtmlStyles } from "../../../utils/commonUtil";
import { twMerge } from "tailwind-merge";

function RichContentRenderer({ content, className, unstylized = false }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: unstylized ? removeHtmlStyles(content) : content,
      }}
      className={twMerge(
        className,
        unstylized ? "unstyled" : "sun-editor-editable"
      )}
    ></div>
  );
}

export default RichContentRenderer;
