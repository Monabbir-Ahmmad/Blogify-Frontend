import { BrowserRouter, useSearchParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import ResetPasswordPage from "../ResetPasswordPage";
import useAuthAction from "../../hooks/useAuthAction";

const renderWithWrapper = (
  ui,
  { authContextData = {}, ...renderOptions } = {}
) => {
  const Wrapper = ({ children }) => {
    return (
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          {children}
        </QueryClientProvider>
      </BrowserRouter>
    );
  };
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

vitest.mock("react-router-dom", async () => ({
  ...(await vitest.importActual("react-router-dom")),
  useSearchParams: vitest.fn(() => []),
}));

vitest.mock("../../hooks/useAuthAction", () => ({
  default: vitest.fn(() => ({
    resetPasswordMutation: { mutate: vitest.fn() },
  })),
}));

describe("ResetPasswordPage", () => {
  const mockResetPasswordMutate = vitest.fn();

  beforeEach(() => {
    useAuthAction.mockImplementation(() => ({
      resetPasswordMutation: { mutate: mockResetPasswordMutate },
    }));
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render the form component", () => {
    renderWithWrapper(<ResetPasswordPage />);

    expect(screen.getByLabelText("New Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm New Password")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("should call resetPasswordMutation with the correct data when the form is submitted", async () => {
    useSearchParams.mockReturnValue([{ get: () => "token" }]);

    renderWithWrapper(<ResetPasswordPage />);

    const passwordInput = screen.getByLabelText("New Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm New Password");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(passwordInput, { target: { value: "NewPassword1!" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "NewPassword1!" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockResetPasswordMutate).toHaveBeenCalledWith(
        {
          password: "NewPassword1!",
          token: "token",
        },
        expect.any(Object)
      );
    });
  });

  it("should display an error message when the password is too short", async () => {
    renderWithWrapper(<ResetPasswordPage />);

    const passwordInput = screen.getByLabelText("New Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm New Password");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(passwordInput, { target: { value: "New" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "New" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Password must have at least 8 characters")
      ).toBeInTheDocument();
    });
  });

  it("should display an error message when the password is weak", async () => {
    renderWithWrapper(<ResetPasswordPage />);

    const passwordInput = screen.getByLabelText("New Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm New Password");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(passwordInput, { target: { value: "newpassword" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "newpassword" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Password must contain at least one uppercase, one lowercase, one number and one special character"
        )
      ).toBeInTheDocument();
    });
  });

  it("should display an error message when the passwords do not match", async () => {
    renderWithWrapper(<ResetPasswordPage />);

    const passwordInput = screen.getByLabelText("New Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm New Password");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(passwordInput, { target: { value: "NewPassword1!" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "NewPassword2!" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("The passwords do not match")
      ).toBeInTheDocument();
    });
  });
});
