import { useEffect, useState } from "react";

import Cropper from "react-easy-crop";
import Slider from "../input/Slider";
import cropImage from "../../../utils/cropImage";
import useDebounceEffect from "../../../hooks/useDebounceEffect";

function ImageEditor({ aspect = 1, circular = true, onChange, imageUrl }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const genetateCroppedImage = async () => {
    try {
      const croppedImage = await cropImage(imageUrl, croppedAreaPixels);
      onChange(croppedImage);
    } catch (e) {}
  };

  useDebounceEffect(
    () => {
      if (croppedAreaPixels && imageUrl) genetateCroppedImage();
    },
    500,
    [croppedAreaPixels]
  );

  useEffect(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  }, [imageUrl]);

  return (
    <div className="flex flex-col space-y-5 w-full">
      <div className="relative h-96 w-full">
        <Cropper
          image={imageUrl}
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

      <div className="px-6 py-4">
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
