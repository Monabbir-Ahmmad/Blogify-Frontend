import { useState } from "react";
import FileDrop from "../input/FileDrop";
import Slider from "../input/Slider";

function ImageEditor({ aspect = 1, circular = false, onChange, defaultValue }) {
  const [image, setImage] = useState(defaultValue);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onFileSelect = (selectedFile) => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="flex">
      {!image && <FileDrop onChange={onFileSelect} value={image} />}

      <div
        className="space-y-5"
        style={{
          display: image ? "block" : "none",
        }}
      >
        <img src={image} alt="Preview" />
        <Slider
          label="Zoom"
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
          min={1}
          max={5}
          step={0.1}
          stepLabel={["1x", "2x", "3x", "4x", "5x"]}
        />
      </div>
    </div>
  );
}

export default ImageEditor;
