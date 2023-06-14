import { twMerge } from "tailwind-merge";

function ConfirmationDialog({
  type = "danger",
  onCancel,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  className,
}) {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-4 bg-paper rounded-3xl p-8",
        className
      )}
    >
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-base opacity-80">{description}</p>

      <div className="flex gap-4 mt-5">
        <button className="btn-base shadow-none" onClick={onCancel}>
          {cancelText}
        </button>

        <button className="btn-error-light shadow-none" onClick={onConfirm}>
          {confirmText}
        </button>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
