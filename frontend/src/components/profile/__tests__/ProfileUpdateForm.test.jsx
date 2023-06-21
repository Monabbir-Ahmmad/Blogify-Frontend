import { afterEach, beforeEach, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import ProfileUpdateForm from "../ProfileUpdateForm";

describe("ProfileUpdateForm", () => {
  const onSubmitMock = vi.fn();

  beforeEach(() => {
    render(<ProfileUpdateForm onSubmit={onSubmitMock} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the profile update form correctly", () => {
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const genderInput = screen.getByLabelText("Gender (Optional)");
    const birthDateInput = screen.getByLabelText("Birth Date (Optional)");
    const bioInput = screen.getByLabelText("Bio (Optional)");
    const passwordInput = screen.getByLabelText("Password");
    const confirmChangesButton = screen.getByText("Confirm Changes");

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(genderInput).toBeInTheDocument();
    expect(birthDateInput).toBeInTheDocument();
    expect(bioInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmChangesButton).toBeInTheDocument();
  });

  it("should display error messages for invalid inputs", async () => {
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.click(screen.getByText("Confirm Changes"));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();

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

    expect(await screen.findByText("Invalid Password")).toBeInTheDocument();

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it("should call onSubmit when the form is submitted with valid inputs", async () => {
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmChangesButton = screen.getByText("Confirm Changes");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password1!" } });

    fireEvent.click(confirmChangesButton);

    waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });
});
