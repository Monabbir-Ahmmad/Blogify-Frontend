import "./RichEditor.css";

import { default as Editor } from "suneditor-react";
import { buttonListResponsive } from "./buttonList";

function RichEditor({
  buttons = buttonListResponsive,
  editorRef,
  onChange,
  options = {
    minHeight: "50vh",
    maxHeight: "80vh",
    height: "auto",
    maxCharCount: 20000,
  },
  ...rest
}) {
  return (
    <Editor
      onChange={onChange}
      getSunEditorInstance={editorRef}
      setOptions={{
        placeholder: "Start writing here...",
        defaultStyle: "font-size:16px; font-family:'Poppins';",
        showPathLabel: false,
        display: "block",
        popupDisplay: "full",
        charCounter: true,
        charCounterLabel: "Characters :",
        fontSize: [18, 20, 22, 24, 26, 28, 36, 48, 72],
        formats: ["p", "div", "pre", "h1", "h2", "h3"],
        imageFileInput: false,
        buttonList: buttons,
        ...options,
      }}
      {...rest}
    />
  );
}

export default RichEditor;
