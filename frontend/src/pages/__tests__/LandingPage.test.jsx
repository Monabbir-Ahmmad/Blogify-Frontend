import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";

import { AuthContext } from "../../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "../LandingPage";
import { ModalContextProvider } from "../../contexts/ModalContext";
import { ThemeContextProvider } from "../../contexts/ThemeContext";
import useAuthAction from "../../hooks/useAuthAction";
import { vitest } from "vitest";

const renderWithWrapper = (ui, { ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => {
    return (
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <AuthContext.Provider
            value={{
              authData: {
                id: 1,
              },
              isAuthenticated: true,
            }}
          >
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

vitest.mock("../../hooks/useAuthAction", () => ({
  default: vitest.fn(() => ({
    signoutMutation: {
      mutate: vitest.fn(),
    },
  })),
}));

describe("LandingPage", () => {
  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render the Navbar, and Footer components", () => {
    renderWithWrapper(<LandingPage />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("should navigate to '/signin' when logout button is clicked", async () => {
    const mockMutate = vitest.fn();

    useAuthAction.mockImplementation(() => ({
      signoutMutation: {
        mutate: mockMutate,
      },
    }));

    renderWithWrapper(<LandingPage />);

    screen.debug(screen.getByTestId("navbar"));

    fireEvent.click(await screen.findByTestId("nav-profile-menu"));

    fireEvent.click(screen.getByRole("menuitem", { name: /logout/i }));

    expect(mockMutate).toHaveBeenCalledTimes(1);
  });
});
