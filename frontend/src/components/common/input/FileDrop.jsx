import imageUpload from "../../../assets/imageUpload.svg";

function FileDrop() {
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="overflow-hidden flex flex-col items-center justify-center w-full border-2 border-slate-300 border-dashed rounded cursor-pointer bg-slate-50"
      >
        <div className="flex flex-col items-center justify-center p-5">
          <img src={imageUpload} alt="Image upload" className="-mt-6" />
          <p className="mb-2 text-sm">
            <span className="font-semibold">Click to upload image</span>
          </p>
          <p className="text-xs">PNG, JPG or JPEG (MAX. 5MB)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
  );
}

export default FileDrop;
