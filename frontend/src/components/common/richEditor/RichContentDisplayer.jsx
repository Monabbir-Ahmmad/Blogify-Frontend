import "./RichEditor.css";

function RichContentDisplayer({ content }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className="sun-editor-editable"
      style={{ fontFamily: "Poppins", fontSize: "16px" }}
    ></div>
  );
}

export default RichContentDisplayer;
