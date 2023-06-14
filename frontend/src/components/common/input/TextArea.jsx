import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const TextArea = forwardRef(
  (
    { className, name, label, placeholder, helperText, error = null, ...rest },
    ref
  ) => {
    return (
      <div>
        {label && (
          <label htmlFor={name} className="input-label">
            {label}
          </label>
        )}
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          ref={ref}
          {...rest}
          className={twMerge("input-base", className, error && "input-error")}
        />

        {helperText && (
          <p className={twMerge("text-sm", error && "text-error")}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

export default TextArea;
