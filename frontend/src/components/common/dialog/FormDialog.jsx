import { RiCloseLine as CloseIcon } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

function FormDialog({ onCancel, title, className, children }) {
  return (
    <div className={twMerge("flex flex-col bg-paper rounded-xl", className)}>
      <header className="flex items-center justify-between px-6 py-4 border-b border-divider">
        <h1 className="text-lg font-semibold">{title}</h1>
        <button className="icon-btn rounded-full" onClick={onCancel}>
          <CloseIcon size={24} />
        </button>
      </header>
      <div className="flex flex-col gap-4 w-full overflow-y-auto max-h-[85vh]">
        {children}
      </div>
    </div>
  );
}

export default FormDialog;
