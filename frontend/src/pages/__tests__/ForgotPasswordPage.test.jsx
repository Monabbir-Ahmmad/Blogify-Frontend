import { BrowserRouter, useSearchParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import ForgotPasswordPage from "../ForgotPasswordPage";
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
  useNavigate: vitest.fn(),
}));

vitest.mock("../../hooks/useAuthAction", () => ({
  default: vitest.fn(() => ({
    forgotPasswordMutation: { mutate: vitest.fn() },
  })),
}));

describe("ForgotPasswordPage", () => {
  const mockForgotPasswordMutate = vitest.fn();

  beforeEach(() => {
    useAuthAction.mockImplementation(() => ({
      forgotPasswordMutation: { mutate: mockForgotPasswordMutate },
    }));
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render the page correctly", () => {
    renderWithWrapper(<ForgotPasswordPage />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByText("Send recovery email")).toBeInTheDocument();
  });

  it("should call forgotPasswordMutation with the correct email when the form is submitted", async () => {
    renderWithWrapper(<ForgotPasswordPage />);

    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByText("Send recovery email");

    fireEvent.change(emailInput, {
      target: {
        value: "test@email.com",
      },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockForgotPasswordMutate).toHaveBeenCalledWith("test@email.com", {
        onSuccess: expect.any(Function),
      });
    });
  });

  it("should show error message when the email is invalid", async () => {
    renderWithWrapper(<ForgotPasswordPage />);

    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByText("Send recovery email");

    fireEvent.change(emailInput, {
      target: {
        value: "test@email",
      },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Email is invalid")).toBeInTheDocument();
    });
  });
});
