import { forwardRef } from "react";

const Checkbox = forwardRef(
  ({ label, name = "checkbox", className, ...rest }, ref) => {
    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={name}
          name={name}
          ref={ref}
          {...rest}
          className="w-5 h-5 accent-primary"
        />
        <label htmlFor={name} className="font-medium">
          {label}
        </label>
      </div>
    );
  }
);

export default Checkbox;
