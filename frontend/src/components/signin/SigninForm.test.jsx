import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import SigninForm from "./SigninForm";

describe("SigninForm", () => {
  const onSubmitMock = vitest.fn();

  beforeEach(() => {
    render(
      <BrowserRouter>
        <SigninForm onSubmit={onSubmitMock} />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render the signin form correctly", () => {
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const rememberCheckbox = screen.getByLabelText("Remember me");
    const forgotPasswordLink = screen.getByText("Forgot Password?");
    const signInButton = screen.getByText("Sign In");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(rememberCheckbox).toBeInTheDocument();
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  it("should display error messages for invalid inputs", async () => {
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.click(screen.getByText("Sign In"));

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "invalid" } });
    fireEvent.blur(emailInput);

    expect(await screen.findByText("Email is invalid")).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: "invalid" } });
    fireEvent.blur(passwordInput);

    expect(await screen.findByText("Invalid password")).toBeInTheDocument();

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it("should call onSubmit when the form is submitted with valid inputs", async () => {
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const signInButton = screen.getByText("Sign In");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password1!" } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });

  it("should navigate to the forgot password page when the forgot password link is clicked", () => {
    const forgotPasswordLink = screen.getByText("Forgot Password?");
    fireEvent.click(forgotPasswordLink);

    expect(window.location.pathname).toBe("/forgot-password");
  });
});
