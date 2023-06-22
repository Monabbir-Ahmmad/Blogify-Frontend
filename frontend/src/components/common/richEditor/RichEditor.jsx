import "./RichEditor.css";

import { forwardRef, useEffect, useRef } from "react";

import SunEditor from "suneditor";
import { buttonListResponsive } from "./buttonList";
import plugins from "suneditor/src/plugins";

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
      ref.current = SunEditor.create(textAreaRef.current, {
        plugins,
        buttonList: buttons,
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
        height,
        minHeight,
        maxHeight,
        maxCharCount,
        ...rest,
      });

      return () => {
        ref.current.destroy();
      };
    }, []);

    return <textarea ref={textAreaRef} style={{ visibility: "hidden" }} />;
  }
);

export default RichEditor;
