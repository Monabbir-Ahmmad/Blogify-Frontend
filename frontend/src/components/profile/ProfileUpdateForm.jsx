import {
  RiCalendar2Line as CalendarIcon,
  RiGenderlessLine as GenderIcon,
  RiLock2Line as LockIcon,
  RiMailLine as MailIcon,
  RiUser6Line as UserIcon,
} from "react-icons/ri";
import { Controller, useForm } from "react-hook-form";

import Input from "../common/input/Input";
import TextArea from "../common/input/TextArea";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

function ProfileUpdateForm({ onSubmit, defaultValue = {}, className }) {
  const { control, handleSubmit } = useForm();

  return (
    <form
      className={twMerge("flex flex-col gap-5 w-full", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        defaultValue={defaultValue?.name || ""}
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
        defaultValue={defaultValue?.email || ""}
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
        name="gender"
        control={control}
        defaultValue={defaultValue?.gender || ""}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            label="Gender (Optional)"
            placeholder="Enter your gender"
            startIcon={GenderIcon}
          />
        )}
      />

      <Controller
        name="birthDate"
        control={control}
        defaultValue={
          defaultValue?.birthDate
            ? dayjs(defaultValue?.birthDate).format("YYYY-MM-DD")
            : ""
        }
        render={({ field }) => (
          <Input
            {...field}
            max={dayjs().subtract(3653, "d").format("YYYY-MM-DD")}
            min={dayjs().subtract(100, "y").format("YYYY-MM-DD")}
            onFocus={(e) => e.currentTarget.showPicker()}
            type="date"
            label="Birth Date (Optional)"
            placeholder="Enter your birth date"
            startIcon={CalendarIcon}
          />
        )}
      />

      <Controller
        name="bio"
        control={control}
        defaultValue={defaultValue?.bio || ""}
        rules={{
          maxLength: {
            value: 500,
            message: "Bio can have at most 500 characters",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <TextArea
            {...field}
            label="Bio (Optional)"
            placeholder="Write a bio about yourself"
            rows={4}
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
            message: "Invalid Password",
          },
          maxLength: {
            value: 20,
            message: "Invalid Password",
          },
          pattern: {
            value:
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#.,;+_=\/\\\$%\^&\*\-])/,
            message: "Invalid Password",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="password"
            label="Password"
            placeholder="Enter you password for confirmation"
            startIcon={LockIcon}
            error={error}
            helperText={error?.message}
          />
        )}
      />

      <button className="btn-primary mt-5">Confirm Changes</button>
    </form>
  );
}

export default ProfileUpdateForm;
