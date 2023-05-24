import FormInput from "../components/common/FormInput";
import React from "react";
import { useForm } from "react-hook-form";

function SigninPage() {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email"
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          }}
          type="email"
          placeholder="Enter your email"
          onChange={(e) => console.log(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SigninPage;
