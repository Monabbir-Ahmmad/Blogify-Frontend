import { Controller, useForm } from "react-hook-form";
import { FiLock as LockIcon, FiMail as MailIcon } from "react-icons/fi";

import Checkbox from "../common/checkbox/Checkbox";
import Input from "../common/input/Input";
import { useState } from "react";

function SignupForm({ onSubmit }) {
  const { control, watch, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      className="flex flex-col gap-5 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{
          required: "Name is required",
          minLength: {
            value: 3,
            message: "Name must have at least 3 characters",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="text"
            label="Name"
            placeholder="Enter your name"
            startIcon={MailIcon}
            error={error}
            helperText={error?.message}
          />
        )}
      />

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
            placeholder="Enter a strong password"
            startIcon={LockIcon}
            error={error}
            helperText={error?.message}
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        rules={{
          required: "Please confirm your password",
          validate: (value) =>
            value === watch("password") || "The passwords do not match",
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            placeholder="Enter your password again"
            startIcon={LockIcon}
            error={error}
            helperText={error?.message}
          />
        )}
      />

      <Checkbox
        label="Show password"
        name="showPassword"
        value={showPassword}
        onChange={() => setShowPassword((prev) => !prev)}
      />

      <button className="btn-primary">Create Account</button>
    </form>
  );
}

export default SignupForm;
