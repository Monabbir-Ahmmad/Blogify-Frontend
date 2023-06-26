import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import PasswordUpdateForm from "../PasswordUpdateForm";

describe("PasswordUpdateForm", () => {
  const onSubmitMock = vitest.fn();

  beforeEach(() => {
    render(
      <BrowserRouter>
        <PasswordUpdateForm onSubmit={onSubmitMock} />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render the password update form correctly", () => {
    const oldPasswordInput = screen.getByLabelText("Current Password");
    const newPasswordInput = screen.getByLabelText("New Password");
    const confirmNewPasswordInput = screen.getByLabelText(
      "Confirm New Password"
    );
    const confirmChangesButton = screen.getByText("Confirm Changes");
    const forgotPasswordLink = screen.getByText("Forgot Password?");

    expect(oldPasswordInput).toBeInTheDocument();
    expect(newPasswordInput).toBeInTheDocument();
    expect(confirmNewPasswordInput).toBeInTheDocument();
    expect(confirmChangesButton).toBeInTheDocument();
    expect(forgotPasswordLink).toBeInTheDocument();
  });

  it("should display error messages for invalid inputs", async () => {
    const oldPasswordInput = screen.getByLabelText("Current Password");
    const newPasswordInput = screen.getByLabelText("New Password");
    const confirmNewPasswordInput = screen.getByLabelText(
      "Confirm New Password"
    );

    fireEvent.click(screen.getByText("Confirm Changes"));

    expect(
      await screen.findByText("Current password is required")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("New password is required")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Please confirm your new password")
    ).toBeInTheDocument();

    fireEvent.change(oldPasswordInput, { target: { value: "weak" } });
    fireEvent.blur(oldPasswordInput);

    expect(await screen.findByText("Invalid password")).toBeInTheDocument();

    fireEvent.change(newPasswordInput, { target: { value: "weak" } });
    fireEvent.blur(newPasswordInput);

    expect(
      await screen.findByText("Password must have at least 8 characters")
    ).toBeInTheDocument();

    fireEvent.change(confirmNewPasswordInput, {
      target: { value: "mismatch" },
    });
    fireEvent.blur(confirmNewPasswordInput);

    expect(
      await screen.findByText("The passwords do not match")
    ).toBeInTheDocument();

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it("should call onSubmit when the form is submitted with valid inputs", async () => {
    const oldPasswordInput = screen.getByLabelText("Current Password");
    const newPasswordInput = screen.getByLabelText("New Password");
    const confirmNewPasswordInput = screen.getByLabelText(
      "Confirm New Password"
    );
    const confirmChangesButton = screen.getByText("Confirm Changes");

    fireEvent.change(oldPasswordInput, { target: { value: "Password1!" } });
    fireEvent.change(newPasswordInput, { target: { value: "NewPassword1!" } });
    fireEvent.change(confirmNewPasswordInput, {
      target: { value: "NewPassword1!" },
    });
    fireEvent.click(confirmChangesButton);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });

  it("should navigate to forgot password page when 'Forgot Password?' link is clicked", () => {
    const forgotPasswordLink = screen.getByText("Forgot Password?");
    fireEvent.click(forgotPasswordLink);

    expect(window.location.pathname).toBe("/forgot-password");
  });
});
