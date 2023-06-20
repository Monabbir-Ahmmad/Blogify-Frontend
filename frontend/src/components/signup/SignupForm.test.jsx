import { afterEach, beforeEach, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import SignupForm from "./SignupForm";

describe("SignupForm", () => {
  const onSubmitMock = vi.fn();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <SignupForm onSubmit={onSubmitMock} />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the signup form correctly", () => {
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const createAccountButton = screen.getByText("Create Account");

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(createAccountButton).toBeInTheDocument();
  });

  it("should display error messages for invalid inputs", async () => {
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    fireEvent.click(screen.getByText("Create Account"));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
    expect(
      await screen.findByText("Please confirm your password")
    ).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: "ab" } });
    fireEvent.blur(nameInput);

    expect(
      await screen.findByText("Name must have at least 3 characters")
    ).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "invalid" } });
    fireEvent.blur(emailInput);

    expect(await screen.findByText("Email is invalid")).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: "weak" } });
    fireEvent.blur(passwordInput);

    expect(
      await screen.findByText("Password must have at least 8 characters")
    ).toBeInTheDocument();

    fireEvent.change(confirmPasswordInput, { target: { value: "mismatch" } });
    fireEvent.blur(confirmPasswordInput);

    expect(
      await screen.findByText("The passwords do not match")
    ).toBeInTheDocument();

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it("should call onSubmit when the form is submitted with valid inputs", async () => {
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const createAccountButton = screen.getByText("Create Account");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password1!" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Password1!" } });
    fireEvent.click(createAccountButton);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });
});
