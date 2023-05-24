import Input from "../components/common/Input";
import React from "react";
import { useForm } from "react-hook-form";

function SigninPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          name="email"
          register={register}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          }}
          type="email"
          placeholder="Enter your email"
          errors={errors}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SigninPage;
