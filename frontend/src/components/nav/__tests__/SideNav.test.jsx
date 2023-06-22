import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { AuthContext } from "../../../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import SideNav from "../SideNav";
import { ThemeContext } from "../../../contexts/ThemeContext";

const links = [
  { to: "/home", icon: RiCloseLine, text: "Home", authRequired: false },
  { to: "/profile", icon: RiCloseLine, text: "Profile", authRequired: true },
];

const toggleDarkMode = vitest.fn();
const toggleMenu = vitest.fn();

const authContextValue = { isAuthenticated: false, authData: null };
const themeContextValue = { darkMode: false, toggleDarkMode };

describe("SideNav", () => {
  it("should render the SideNav component with links for unauthenticated user", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={authContextValue}>
          <ThemeContext.Provider value={themeContextValue}>
            <SideNav links={links} open={true} toggleMenu={toggleMenu} />
          </ThemeContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const homeLink = screen.getByRole("link", { name: "Home" });
    const themeButton = screen.getByRole("button", {
      name: "Enable Dark Mode",
    });
    const signinLink = screen.getByRole("link", { name: "Sign In" });
    const signupLink = screen.getByRole("link", { name: "Sign Up" });
    const profileLink = screen.queryByRole("link", { name: "Profile" });
    const logoutButton = screen.queryByRole("button", { name: "Logout" });

    expect(homeLink).toBeInTheDocument();
    expect(themeButton).toBeInTheDocument();
    expect(signinLink).toBeInTheDocument();
    expect(signupLink).toBeInTheDocument();
    expect(profileLink).not.toBeInTheDocument();
    expect(logoutButton).not.toBeInTheDocument();
  });

  it("should render the SideNav component with links for authenticated user", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            isAuthenticated: true,
            authData: { name: "John", profileImage: "" },
          }}
        >
          <ThemeContext.Provider value={themeContextValue}>
            <SideNav links={links} open={true} toggleMenu={toggleMenu} />
          </ThemeContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const homeLink = screen.getByRole("link", { name: "Home" });
    const themeButton = screen.getByRole("button", {
      name: "Enable Dark Mode",
    });
    const signinLink = screen.queryByRole("link", { name: "Sign In" });
    const signupLink = screen.queryByRole("link", { name: "Sign Up" });
    const profileLink = screen.getByRole("link", { name: "Profile" });
    const logoutButton = screen.getByRole("button", { name: "Logout" });

    expect(homeLink).toBeInTheDocument();
    expect(themeButton).toBeInTheDocument();
    expect(signinLink).not.toBeInTheDocument();
    expect(signupLink).not.toBeInTheDocument();
    expect(profileLink).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  it("should handle the toggleMenu function", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={authContextValue}>
          <ThemeContext.Provider value={themeContextValue}>
            <SideNav links={links} open={true} toggleMenu={toggleMenu} />
          </ThemeContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);

    expect(toggleMenu).toHaveBeenCalledTimes(1);
  });

  it("should handle the toggleDarkMode function", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={authContextValue}>
          <ThemeContext.Provider value={themeContextValue}>
            <SideNav links={links} open={true} toggleMenu={toggleMenu} />
          </ThemeContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const themeButton = screen.getByRole("button", {
      name: "Enable Dark Mode",
    });

    fireEvent.click(themeButton);

    expect(toggleDarkMode).toHaveBeenCalledTimes(1);

    waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
  });

  it("should handle the onLogout function", () => {
    const onLogout = vitest.fn();

    render(
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            isAuthenticated: true,
            authData: { name: "John", profileImage: "" },
          }}
        >
          <ThemeContext.Provider value={themeContextValue}>
            <SideNav
              links={links}
              open={true}
              toggleMenu={toggleMenu}
              onLogout={onLogout}
            />
          </ThemeContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const logoutButton = screen.getByRole("button", { name: "Logout" });
    fireEvent.click(logoutButton);

    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});
