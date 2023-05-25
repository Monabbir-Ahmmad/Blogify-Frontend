import { Controller, useForm } from "react-hook-form";
import { FiLock as LockIcon, FiMail as MailIcon } from "react-icons/fi";

import Checkbox from "../common/checkbox/Checkbox";
import Input from "../common/input/Input";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function SigninForm({ onSubmit }) {
  const { control, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email is invalid",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="email"
            label="Email"
            placeholder="Enter your email"
            startIcon={MailIcon}
            error={error}
            helperText={error?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters",
          },
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\w!@#$%^&*]+$/i,
            message:
              "Password must contain at least one uppercase, one lowercase, one number and one special character",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter your password"
            startIcon={LockIcon}
            error={error}
            helperText={error?.message}
          />
        )}
      />

      <div className="flex flex-col sm:flex-row justify-between gap-4 py-2">
        <Checkbox
          label="Show password"
          name="showPassword"
          value={showPassword}
          onChange={() => setShowPassword((prev) => !prev)}
        />
        <NavLink className="text-primary font-semibold" to="/forgot-password">
          Forgot Password?
        </NavLink>
      </div>

      <button className="btn-primary">Sign In</button>
    </form>
  );
}

export default SigninForm;
