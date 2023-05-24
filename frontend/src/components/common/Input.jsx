import React from "react";

const Input = ({ label, name, register, rules, errors, ...rest }) => {
  const error = errors[name];

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      >
        {label}
      </label>
      <input
        {...register(name, rules)}
        {...rest}
        id={name}
        className={`${
          error ? "ring-error ring-2" : ""
        } appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name`}
      />
      {error && (
        <p className="text-error text-xs font-bold mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default Input;
