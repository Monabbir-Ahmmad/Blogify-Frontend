import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Input = forwardRef(
  (
    {
      className,
      name,
      type,
      label,
      placeholder,
      helperText,
      error = null,
      startIcon: StartIcon = null,
      ...rest
    },
    ref
  ) => {
    return (
      <div>
        {label && (
          <label
            htmlFor={name}
            className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {StartIcon && (
            <div
              className={twMerge(
                "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500",
                error && "text-error"
              )}
            >
              <StartIcon size={20} />
            </div>
          )}
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            ref={ref}
            {...rest}
            className={twMerge(
              "outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-gray-500 focus:border-gray-500 focus:ring-1 block w-full p-3",
              className,
              StartIcon && "pl-10",
              error && "border-error focus:border-error focus:ring-error"
            )}
          />
        </div>

        {helperText && (
          <p
            className={twMerge("text-sm text-gray-700", error && "text-error")}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

export default Input;
