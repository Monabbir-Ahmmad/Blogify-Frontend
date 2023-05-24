import React, { useCallback, useRef, useState } from "react";

import { useController } from "react-hook-form";

const FormInput = ({
  label,
  name,
  type = "text",
  defaultValue = "",
  control,
  rules,
  onChange,
  className,
  ...rest
}) => {
  const {
    field: { ref, value, onChange: defaultOnChange, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
    rules,
  });

  const handleChange = (e) => {
    defaultOnChange(e); // Call the default onChange provided by react-hook-form
    if (onChange) {
      onChange(e); // Call the onChange passed from outside the component
    }
  };

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        ref={ref} // Assign the input's ref from react-hook-form
        value={value}
        onChange={handleChange} // Assign the custom handleChange function to onChange
        {...inputProps}
        {...rest}
        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormInput;
