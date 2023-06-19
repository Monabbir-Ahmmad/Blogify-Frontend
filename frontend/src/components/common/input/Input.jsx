import {
  RiEyeOffLine as InvisibleIcon,
  RiEyeLine as VisibleIcon,
} from "react-icons/ri";
import { forwardRef, useState } from "react";

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
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div>
        {label && (
          <label htmlFor={label} className="input-label">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={label}
            name={name}
            type={showPassword ? "text" : type}
            placeholder={placeholder}
            ref={ref}
            {...rest}
            className={twMerge(
              "peer input-base",
              className,
              StartIcon && "pl-10",
              type === "password" && "pr-12",
              error && "is-invalid input-error"
            )}
          />

          {StartIcon && (
            <span className="input-icon-start opacity-50 peer-focus:opacity-100 peer-[.is-invalid]:text-error">
              <StartIcon size={20} />
            </span>
          )}

          {type === "password" && (
            <span className="p-1 absolute inset-y-0 right-0 inline-flex items-center mr-1">
              <button
                type="button"
                className="icon-btn p-2 rounded-full"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <InvisibleIcon size={20} />
                ) : (
                  <VisibleIcon size={20} />
                )}
              </button>
            </span>
          )}
        </div>

        {helperText && (
          <p className={twMerge("text-sm", error && "text-error")}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

export default Input;
