import { Controller, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import AppLogo from "../components/common/AppLogo";
import { AuthContext } from "../contexts/AuthContext";
import Input from "../components/common/input/Input";
import { RiLock2Line as LockIcon } from "react-icons/ri";
import resetPasswordImage from "../assets/resetPassword.svg";
import { toast } from "react-toastify";
import useAuthAction from "../hooks/useAuthAction";
import { useContext } from "react";

function ForgotPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { control, watch, handleSubmit } = useForm();

  const { resetPasswordMutation } = useAuthAction(useContext(AuthContext));

  const onSubmit = (data) =>
    resetPasswordMutation.mutate(
      {
        password: data.password,
        token: searchParams.get("token"),
      },
      {
        onSuccess: () => {
          toast.success("Password reset successful");
          navigate("/signin", { replace: true });
        },
      }
    );

  return (
    <main className="flex flex-col gap-5 items-center justify-center p-8">
      <AppLogo className="text-4xl" size={50} />
      <object
        type="image/svg+xml"
        data={resetPasswordImage}
        className="max-h-[300px] "
      />
      <h2 className="text-2xl">Reset your password</h2>

      <form
        className="flex flex-col gap-5 max-w-lg w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="password"
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
              placeholder="Enter a new strong password"
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
            required: "Please confirm your new password",
            validate: (value) =>
              value === watch("password") || "The passwords do not match",
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

        <button className="btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}

export default ForgotPasswordPage;
