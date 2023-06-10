import { useEffect, useState } from "react";

import FileDrop from "../common/input/FileDrop";
import ImageEditor from "../common/imageEditor/ImageEditor";

function ImagePickerForm({ defaultImage, onSubmit, avatarPicker = false }) {
  const [image, setImage] = useState();
  const [editedImage, setEditedImage] = useState();

  const onImageEdit = (file) => {
    setEditedImage(file);
  };

  const onImageSelect = (file) => {
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    onSubmit(editedImage);
  };

  const handleDelete = () => {
    onSubmit(null);
  };

  useEffect(() => {
    setImage(defaultImage);
  }, [defaultImage]);

  return (
    <div>
      <div className="p-4">
        <FileDrop compact={!!image} onChange={onImageSelect} />
      </div>

      {image && (
        <>
          <ImageEditor
            aspect={avatarPicker ? 1 : 1920 / 400}
            circular={avatarPicker}
            onChange={onImageEdit}
            imageUrl={image}
          />

          <div className="p-4 flex gap-4 w-full">
            <button
              className="btn-primary flex-1 uppercase"
              onClick={handleSubmit}
            >
              Update Image
            </button>
            {defaultImage && (
              <button
                className="btn-error-outlined flex-1 uppercase"
                onClick={handleDelete}
              >
                Remove Image
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ImagePickerForm;
