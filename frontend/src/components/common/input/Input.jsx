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
          <label
            htmlFor={name}
            className="block uppercase text-sm font-bold mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={name}
            name={name}
            type={showPassword ? "text" : type}
            placeholder={placeholder}
            ref={ref}
            {...rest}
            className={twMerge(
              "peer transition-all placeholder:text-slate-300 outline-none bg-slate-50 border border-slate-300 text-sm rounded focus:ring-slate-400 focus:border-slate-400 focus:ring-1 block w-full p-3",
              className,
              StartIcon && "pl-10",
              type === "password" && "pr-12",
              error &&
                "is-invalid border-error focus:border-error focus:ring-error"
            )}
          />

          {StartIcon && (
            <span
              className={twMerge(
                "peer-focus:text-slate-400 peer-[.is-invalid]:text-error absolute inset-y-0 left-0 inline-flex items-center ml-3 text-slate-300 transition-all"
              )}
            >
              <StartIcon size={20} />
            </span>
          )}

          {type === "password" && (
            <span className="p-1 absolute inset-y-0 right-0 inline-flex items-center mr-1">
              <span
                className={twMerge(
                  "icon-btn-base p-2 bg-transparent shadow-none rounded-full"
                )}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <InvisibleIcon size={20} />
                ) : (
                  <VisibleIcon size={20} />
                )}
              </span>
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
