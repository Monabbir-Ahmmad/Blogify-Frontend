import { Controller, useForm } from "react-hook-form";

import Input from "../common/input/Input";
import { Link } from "react-router-dom";
import { RiLock2Line as LockIcon } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

function PasswordUpdateForm({ onSubmit, className }) {
  const { control, watch, handleSubmit } = useForm();

  return (
    <form
      className={twMerge("flex flex-col gap-5 w-full", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="oldPassword"
        control={control}
        defaultValue=""
        rules={{
          required: "Current password is required",
          minLength: {
            value: 8,
            message: "Invalid password",
          },
          pattern: {
            value:
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#.,;+_=\/\\\$%\^&\*\-])/,
            message: "Invalid password",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="password"
            label="Current Password"
            placeholder="Enter your current password"
            startIcon={LockIcon}
            error={error}
            helperText={error?.message}
          />
        )}
      />

      <Controller
        name="newPassword"
        control={control}
        defaultValue=""
        rules={{
          required: "New password is required",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters",
          },
          pattern: {
            value:
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#.,;+_=\/\\\$%\^&\*\-])/,
            message:
              "Password must contain at least one uppercase, one lowercase, one number and one special character",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="password"
            label="New Password"
            placeholder="Enter a strong new password"
            startIcon={LockIcon}
            error={error}
            helperText={error?.message}
          />
        )}
      />

      <Controller
        name="confirmNewPassword"
        control={control}
        defaultValue=""
        rules={{
          required: "Please confirm your new password",
          validate: (value) =>
            value === watch("newPassword") || "The passwords do not match",
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="password"
            label="Confirm New Password"
            placeholder="Enter your new password again"
            startIcon={LockIcon}
            error={error}
            helperText={error?.message}
          />
        )}
      />

      <div className="flex gap-2">
        <button className="btn-primary">Confirm Changes</button>
        <Link to="forgot-password" className="btn-primary-outlined">
          Forgot Password?
        </Link>
      </div>
    </form>
  );
}

export default PasswordUpdateForm;
