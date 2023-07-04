import { BrowserRouter, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { AuthContext } from "../../contexts/AuthContext";
import { ModalContextProvider } from "../../contexts/ModalContext";
import SigninPage from "../SigninPage";
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
    signinMutation: { mutate: vitest.fn() },
  })),
}));

describe("SigninPage", () => {
  const mockUseNavigate = vitest.fn();
  const mockSigninMutate = vitest.fn();

  beforeEach(() => {
    useNavigate.mockImplementation(() => mockUseNavigate);
    useAuthAction.mockImplementation(() => ({
      signinMutation: { mutate: mockSigninMutate },
    }));
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render the form component", () => {
    renderWithWrapper(<SigninPage />);

    expect(screen.getByTestId("signin-form")).toBeInTheDocument();
  });

  it("should call signinMutation when the form is submitted", async () => {
    renderWithWrapper(<SigninPage />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const signinButton = screen.getByText("Sign In");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password1!" } });
    fireEvent.click(signinButton);

    await waitFor(() => {
      expect(mockSigninMutate).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "Password1!",
        remember: false,
      });
    });
  });

  it("should navigate to '/' when the user is authenticated", () => {
    renderWithWrapper(<SigninPage />, {
      authContextData: { isAuthenticated: true },
    });

    expect(mockUseNavigate).toHaveBeenCalledWith("/", { replace: true });
  });

  it("should navigate to '/signup' when the 'Sign Up' link is clicked", () => {
    renderWithWrapper(<SigninPage />);

    const signupLink = screen.getByText("Sign Up");
    fireEvent.click(signupLink);

    expect(window.location.pathname).toBe("/signup");
  });

  it("should navigate to '/' when the 'continue as Guest' link is clicked", () => {
    renderWithWrapper(<SigninPage />);

    const continueAsGuestLink = screen.getByText("continue as Guest");
    fireEvent.click(continueAsGuestLink);

    expect(window.location.pathname).toBe("/");
  });
});
