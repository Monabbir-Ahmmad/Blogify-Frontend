import { Controller, useForm } from "react-hook-form";
import {
  RiLock2Line as LockIcon,
  RiMailLine as MailIcon,
} from "react-icons/ri";

import Checkbox from "../common/checkbox/Checkbox";
import Input from "../common/input/Input";
import { Link } from "react-router-dom";

function SigninForm({ onSubmit }) {
  const { control, handleSubmit } = useForm();

  return (
    <form
      className="flex flex-col gap-5 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
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
            placeholder="Enter your password"
            startIcon={LockIcon}
            error={error}
            helperText={error?.message}
          />
        )}
      />

      <div className="flex flex-col sm:flex-row justify-between gap-4 py-2">
        <Controller
          name="remember"
          control={control}
          defaultValue={false}
          render={({ field }) => <Checkbox label="Remember me" {...field} />}
        />

        <Link className="text-primary font-semibold" to="/forgot-password">
          Forgot Password?
        </Link>
      </div>

      <button className="btn-primary">Sign In</button>
    </form>
  );
}

export default SigninForm;
