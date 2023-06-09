import { useCallback, useState } from "react";

import Cropper from "react-easy-crop";
import FileDrop from "../input/FileDrop";
import Slider from "../input/Slider";
import cropImage from "../../../utils/cropImage";
import useDebounceEffect from "../../../hooks/useDebounceEffect";

function ImageEditor({ aspect = 1, circular = true, onChange, defaultValue }) {
  const [image, setImage] = useState(
    defaultValue instanceof File
      ? URL.createObjectURL(defaultValue)
      : defaultValue
  );
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const genetateCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await cropImage(image, croppedAreaPixels);
      onChange(croppedImage);
    } catch (e) {}
  }, [croppedAreaPixels]);

  useDebounceEffect(
    () => {
      if (croppedAreaPixels && image) {
        genetateCroppedImage();
      }
    },
    500,
    [croppedAreaPixels]
  );

  return (
    <div>
      <div className="p-4">
        <FileDrop compact={true} onChange={onFileSelect} />
      </div>

      <div
        className="flex flex-col space-y-5 w-full"
        style={{
          display: image ? "flex" : "none",
        }}
      >
        <div
          className="relative h-96 flex flex-col space-y-5 w-full"
          style={{
            display: image ? "flex" : "none",
          }}
        >
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            cropShape={circular ? "round" : "rect"}
            aspect={aspect}
            maxZoom={5}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        <div className="p-6">
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
    </div>
  );
}

export default ImageEditor;
