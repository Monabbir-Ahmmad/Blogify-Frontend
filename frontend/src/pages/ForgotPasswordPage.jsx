import { Controller, useForm } from "react-hook-form";

import AppLogo from "../components/common/AppLogo";
import { AuthContext } from "../contexts/AuthContext";
import Input from "../components/common/input/Input";
import { RiMailLine as MailIcon } from "react-icons/ri";
import forgotPasswordImage from "../assets/forgotPassword.svg";
import { toast } from "react-toastify";
import useAuthAction from "../hooks/useAuthAction";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();

  const { forgotPasswordMutation } = useAuthAction(useContext(AuthContext));

  const onSubmit = (data) =>
    forgotPasswordMutation.mutate(data.email, {
      onSuccess: () => {
        toast.success("A recovery email has been sent to your email address");
        navigate(-1);
      },
    });

  return (
    <main className="flex flex-col gap-5 items-center justify-center p-8">
      <AppLogo className="text-4xl" size={50} />
      <object
        type="image/svg+xml"
        data={forgotPasswordImage}
        className="max-h-[300px] "
      />
      <h2 className="text-2xl">Forgot your password?</h2>
      <h3 className="text-lg opacity-70 max-w-2xl text-center">
        Don't worry, it happens to the best of us. Just enter your email address
        below and we'll send you a recovery link
      </h3>

      <form
        className="flex flex-col gap-5 max-w-lg w-full"
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

        <button className="btn-primary">Send recovery email</button>
      </form>
    </main>
  );
}

export default ForgotPasswordPage;
