import { RiCloseLine as RemoveIcon } from "react-icons/ri";
import imageUpload from "../../../assets/imageUpload.svg";

const ImagePreview = ({ image, onRemoveClick }) => {
  if (!image) return null;
  return (
    <div className="relative">
      <img
        src={image instanceof File ? URL.createObjectURL(image) : image}
        alt=""
        className="object-cover h-64 w-full rounded-xl"
      />
      <button
        onClick={onRemoveClick}
        className="icon-btn-error absolute top-4 right-4"
      >
        <RemoveIcon size={20} />
      </button>
    </div>
  );
};

function FileDrop({
  maxSizeKB = 1024 * 5,
  allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"],
  onChange,
  value,
  compact = false,
}) {
  const handlePreventDefault = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      validateFile(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateFile(file);
    }
  };

  const validateFile = (file) => {
    if (file.size <= maxSizeKB * 1024) {
      if (allowedMimeTypes.includes(file.type)) {
        onChange(file);
      } else {
        alert("Invalid file type. Please choose a valid file type.");
      }
    } else {
      alert(`File size exceeds the maximum limit of ${maxSizeKB}KB.`);
    }
  };

  const handleRemoveImage = () => onChange(null);

  return (
    <div
      className="w-full"
      onDragEnter={handlePreventDefault}
      onDragLeave={handlePreventDefault}
      onDragOver={handlePreventDefault}
      onDrop={handleDrop}
    >
      <ImagePreview image={value} onRemoveClick={handleRemoveImage} />

      {!value && (
        <div>
          <label
            htmlFor="dropzone-file"
            className="cursor-pointer overflow-hidden w-full p-4 flex flex-col items-center justify-center border-2 border-divider border-dashed rounded bg-slate-50 hover:bg-slate-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
          >
            {!compact && (
              <img src={imageUpload} alt="Upload" className="-mt-6 h-44" />
            )}
            <p className="mb-2 text-sm">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs">PNG, JPG or JPEG (MAX. 5MB)</p>
            <input
              id="dropzone-file"
              type="file"
              accept={allowedMimeTypes.join(",")}
              onChange={handleFileInputChange}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
}

export default FileDrop;
