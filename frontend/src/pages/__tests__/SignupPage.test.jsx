import { BrowserRouter, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { AuthContext } from "../../contexts/AuthContext";
import { ModalContextProvider } from "../../contexts/ModalContext";
import SignupPage from "../SignupPage";
import { ThemeContextProvider } from "../../contexts/ThemeContext";
import useAuthAction from "../../hooks/useAuthAction";

const renderWithWrapper = (
  ui,
  { authContextData = {}, ...renderOptions } = {}
) => {
  const Wrapper = ({ children }) => {
    return (
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <AuthContext.Provider value={authContextData}>
            <ModalContextProvider>
              <ThemeContextProvider>{children}</ThemeContextProvider>
            </ModalContextProvider>
          </AuthContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  };
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

vitest.mock("react-router-dom", async () => ({
  ...(await vitest.importActual("react-router-dom")),
  useNavigate: vitest.fn(),
}));

vitest.mock("../../hooks/useAuthAction", () => ({
  default: vitest.fn(() => ({
    signupMutation: { mutate: vitest.fn() },
  })),
}));

describe("SignupPage", () => {
  const mockUseNavigate = vitest.fn();
  const mockSignupMutate = vitest.fn();

  beforeEach(() => {
    useNavigate.mockImplementation(() => mockUseNavigate);
    useAuthAction.mockImplementation(() => ({
      signupMutation: { mutate: mockSignupMutate },
    }));
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render the form component", () => {
    renderWithWrapper(<SignupPage />);

    expect(screen.getByTestId("signup-form")).toBeInTheDocument();
  });

  it("should call signupMutation when the form is submitted", async () => {
    renderWithWrapper(<SignupPage />);

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const signupButton = screen.getByText("Create Account");

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password1!" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Password1!" },
    });
    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(mockSignupMutate).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@example.com",
        password: "Password1!",
        confirmPassword: "Password1!",
      });
    });
  });

  it("should navigate to '/' when the user is created", () => {
    renderWithWrapper(<SignupPage />, {
      authContextData: { isAuthenticated: true },
    });

    expect(mockUseNavigate).toHaveBeenCalledWith("/", { replace: true });
  });

  it("should navigate to '/signin' when the 'Sign In' link is clicked", () => {
    renderWithWrapper(<SignupPage />);

    const signinLink = screen.getByText("Sign In");
    fireEvent.click(signinLink);

    expect(window.location.pathname).toBe("/signin");
  });

  it("should navigate to '/' when the 'continue as Guest' link is clicked", () => {
    renderWithWrapper(<SignupPage />);

    const continueAsGuestLink = screen.getByText("continue as Guest");
    fireEvent.click(continueAsGuestLink);

    expect(window.location.pathname).toBe("/");
  });
});
