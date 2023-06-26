import { fireEvent, render, screen } from "@testing-library/react";

import { AuthContext } from "../../../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../Navbar";
import { ThemeContext } from "../../../contexts/ThemeContext";

const renderWithWrapper = (
  ui,
  {
    authContextData = {
      authData: { id: 123456 },
      isAuthenticated: true,
    },
    themeContextData = { darkMode: false, toggleDarkMode: vitest.fn() },
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => {
    return (
      <BrowserRouter>
        <ThemeContext.Provider value={themeContextData}>
          <AuthContext.Provider value={authContextData}>
            {children}
          </AuthContext.Provider>
        </ThemeContext.Provider>
      </BrowserRouter>
    );
  };
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

describe("Navbar", () => {
  const onLogout = vitest.fn();

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render the Navbar component correctly when user is unauthenticated", () => {
    renderWithWrapper(<Navbar onLogout={onLogout} />, {
      authContextData: { authData: null, isAuthenticated: false },
    });

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getAllByText(/Blogify/i)).toHaveLength(2);
    expect(screen.getAllByTestId("search-form")).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "Sign In" })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "Sign Up" })).toHaveLength(2);
    expect(screen.queryByTestId("nav-profile-menu")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Logout" })
    ).not.toBeInTheDocument();
  });

  it("should render the Navbar component correctly when user is authenticated", () => {
    renderWithWrapper(<Navbar onLogout={onLogout} />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getAllByText(/Blogify/i)).toHaveLength(2);
    expect(screen.getAllByTestId("search-form")).toHaveLength(2);
    expect(
      screen.queryByRole("a", { name: "Sign In" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("a", { name: "Sign Up" })
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("nav-profile-menu")).toBeInTheDocument();
    expect(screen.getAllByText("Logout")).toHaveLength(2);
  });

  it("should open the sidebar when the menu button is clicked", () => {
    renderWithWrapper(<Navbar onLogout={onLogout} />);

    const menuButton = screen.getByTestId("menu-button");
    const sideNav = screen.getByTestId("side-nav");

    expect(sideNav.className).toContain("-translate-x-full");

    fireEvent.click(menuButton);

    expect(sideNav.className).toContain("translate-x-0");
  });
});
