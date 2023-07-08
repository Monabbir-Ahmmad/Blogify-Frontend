import { Controller, useForm } from "react-hook-form";
import {
  RiLock2Line as LockIcon,
  RiMailLine as MailIcon,
  RiUser6Line as UserIcon,
} from "react-icons/ri";

import Input from "../common/input/Input";

function SignupForm({ onSubmit }) {
  const { control, watch, handleSubmit } = useForm();

  return (
    <form
      data-testid="signup-form"
      className="flex flex-col gap-5 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{
          validate: (value) => !!value.trim() || "Name is required",
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
            startIcon={UserIcon}
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
          validate: (value) => !!value.trim() || "Email is required",
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
          maxLength: {
            value: 20,
            message: "Password can have at most 20 characters",
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
            type="password"
            label="Confirm Password"
            placeholder="Enter your password again"
            startIcon={LockIcon}
            error={error}
            helperText={error?.message}
          />
        )}
      />

      <button className="btn-primary mt-5">Create Account</button>
    </form>
  );
}

export default SignupForm;
