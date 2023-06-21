import { useEffect, useRef } from "react";

import plugins from "suneditor/src/plugins";
import suneditor from "suneditor";

const getLanguage = async (lang) => {
  switch (typeof lang) {
    case "string":
      return (await import(`suneditor/src/lang/en.js`)).default;
    case "object":
      return lang;
    default:
      return undefined;
  }
};

const events = [
  "onMouseDown",
  "onScroll",
  "onInput",
  "onClick",
  "onKeyUp",
  "onKeyDown",
  "onFocus",
  "onImageUploadBefore",
  "onVideoUploadBefore",
  "onAudioUploadBefore",
  "onImageUpload",
  "onAudioUpload",
  "onVideoUpload",
  "onImageUploadError",
  "onVideoUploadError",
  "onAudioUploadError",
  "onSave",
  "onSetToolbarButtons",
  "imageUploadHandler",
  "toggleCodeView",
  "toggleFullScreen",
  "showInline",
  "showController",
];

function SunEditor(props) {
  const {
    name,
    lang,
    setOptions = {},
    placeholder,
    width = "100%",
    height,
    defaultValue,
    setContents,
    setDefaultStyle,
    getSunEditorInstance,
    appendContents,
    setAllPlugins = true,
    disable = false,
    readOnly = false,
    hide = false,
    hideToolbar = false,
    disableToolbar = false,
    onChange,
    autoFocus,
    onBlur,
    onLoad,
  } = props;

  const txtArea = useRef(null);
  const editor = useRef(null);
  const initialEffect = useRef(true);

  useEffect(() => {
    const options = {
      ...setOptions,
      lang: lang ? getLanguage(lang) : setOptions.lang,
      width: width || setOptions.width,
      placeholder: placeholder || setOptions.placeholder,
      plugins: setOptions.plugins || (setAllPlugins ? plugins : undefined),
      height: height || setOptions.height,
      value: defaultValue || setOptions.value,
      defaultStyle: setDefaultStyle || setOptions.defaultStyle,
    };

    if (name && options.value) txtArea.current.value = options.value;

    editor.current = suneditor.create(txtArea.current, options);

    if (getSunEditorInstance) getSunEditorInstance(editor.current);

    editor.current.onload = (_, reload) => {
      if (reload) return onLoad?.(reload);

      if (setContents) {
        editor.current.setContents(setContents);
        editor.current.core.focusEdge(null);
      }
      if (appendContents) editor.current.appendContents(appendContents);
      if (editor.current.util.isIE) editor.current.core._createDefaultRange();
      if (disable) editor.current.disable();
      if (readOnly) editor.current.readOnly(true);
      if (hide) editor.current.hide();
      if (hideToolbar) editor.current.toolbar.hide();
      if (disableToolbar) editor.current.toolbar.disable();

      if (autoFocus === false)
        editor.current.core.context.element.wysiwyg.blur();
      else if (autoFocus) editor.current.core.context.element.wysiwyg.focus();

      return onLoad?.(reload);
    };

    editor.current.onChange = (content) => {
      if (name && txtArea.current) txtArea.current.value = content;
      if (onChange) onChange(content);
    };

    if (onBlur) {
      editor.current.onBlur = (e) =>
        onBlur(e, editor.current.getContents(true));
    }

    events.forEach((event) => {
      const value = props[event];
      if (value && editor.current) {
        editor.current[event] = value;
      }
    });

    return () => {
      if (editor.current) editor.current.destroy();
      editor.current = null;
    };
  }, []);

  useEffect(() => {
    if (initialEffect.current) return;
    editor.current?.setOptions({
      lang: getLanguage(lang),
    });
  }, [lang]);

  useEffect(() => {
    if (initialEffect.current) return;
    editor.current?.setOptions({
      placeholder,
      height,
      width,
    });
  }, [placeholder, height, width]);

  useEffect(() => {
    if (setDefaultStyle && !initialEffect.current)
      editor.current?.setDefaultStyle(setDefaultStyle);
  }, [setDefaultStyle]);

  useEffect(() => {
    if (
      !initialEffect.current &&
      setContents !== undefined &&
      !editor.current?.core.hasFocus
    ) {
      editor.current?.setContents(setContents);
    }
  }, [setContents]);

  useEffect(() => {
    if (
      !initialEffect.current &&
      appendContents !== undefined &&
      !editor.current?.core.hasFocus
    ) {
      editor.current?.appendContents(appendContents);
      editor.current?.core.focusEdge(null);
    }
  }, [appendContents]);

  useEffect(() => {
    if (initialEffect.current) return;
    editor.current?.readOnly(readOnly);

    if (hideToolbar) editor.current?.toolbar.hide();
    else editor.current?.toolbar.show();

    if (disableToolbar) editor.current?.toolbar.disable();
    else editor.current?.toolbar.enable();

    if (disable) editor.current?.disable();
    else editor.current?.enable();

    if (hide) editor.current?.hide();
    else editor.current?.show();
  }, [disable, hideToolbar, disableToolbar, hide, readOnly]);

  useEffect(() => {
    initialEffect.current = false;
  }, []);

  return (
    <textarea style={{ visibility: "hidden" }} ref={txtArea} {...{ name }} />
  );
}

export default SunEditor;
