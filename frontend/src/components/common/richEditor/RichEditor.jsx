import "./RichEditor.css";

import { forwardRef, useEffect, useRef } from "react";

import { buttonListResponsive } from "./buttonList";
import plugins from "suneditor/src/plugins";
import sunEditor from "suneditor";

const RichEditor = forwardRef(
  (
    {
      buttons = buttonListResponsive,
      minHeight = "50vh",
      maxHeight = "80vh",
      height = "auto",
      maxCharCount = 5000,
      defaultValue = "",
      ...rest
    },
    ref
  ) => {
    const textAreaRef = useRef(null);

    useEffect(() => {
      const editor = sunEditor.create(textAreaRef.current, {
        plugins,
        buttonList: buttons,
        placeholder: "Start writing here...",
        defaultStyle: "font-size:16px; font-family:'Poppins';",
        showPathLabel: false,
        display: "block",
        popupDisplay: "full",
        fontSize: [18, 20, 22, 24, 26, 28, 36, 48, 72],
        formats: ["p", "div", "pre", "h1", "h2", "h3"],
        imageFileInput: false,
        height,
        minHeight,
        maxHeight,
        maxCharCount,
        charCounterLabel: "Characters :",
        value: defaultValue,
        ...rest,
      });

      if (ref) ref.current = editor;

      return () => {
        editor.destroy();
      };
    }, []);

    return <textarea ref={textAreaRef} style={{ visibility: "hidden" }} />;
  }
);

export default RichEditor;
