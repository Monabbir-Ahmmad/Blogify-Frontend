import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { AuthContext } from "../../../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import NavProfileMenu from "../NavProfileMenu";
import { ThemeContext } from "../../../contexts/ThemeContext";

const authData = {
  name: "John Doe",
  profileImage: "avatar.jpg",
  id: 123456,
};

describe("NavProfileMenu", () => {
  const toggleDarkMode = vitest.fn();
  const onLogout = vitest.fn();

  beforeEach(() => {
    render(
      <BrowserRouter>
        <ThemeContext.Provider value={{ darkMode: false, toggleDarkMode }}>
          <AuthContext.Provider value={{ authData }}>
            <NavProfileMenu onLogout={onLogout} />
          </AuthContext.Provider>
        </ThemeContext.Provider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render the NavProfileMenu component", () => {
    expect(screen.getByAltText("Avatar")).toBeInTheDocument();
    expect(screen.getByRole("menu").className).toContain("scale-0");
  });

  it("should toggle the menu when the avatar is clicked", () => {
    const popover = screen.getByRole("menu");

    expect(popover.className).toContain("scale-0");

    fireEvent.click(screen.getByAltText("Avatar"));

    expect(popover.className).toContain("scale-100");
  });

  it("should call toggleDarkMode when the theme option is clicked",async () => {
    fireEvent.click(screen.getByAltText("Avatar"));

    const themeOption = screen.getByText(/Enable Dark Mode/i);
    fireEvent.click(themeOption);

    expect(toggleDarkMode).toHaveBeenCalledTimes(1);

   await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
  });

  it("should call onLogout when the logout option is clicked", () => {
    const logoutOption = screen.getByText(/Logout/i);
    fireEvent.click(logoutOption);

    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});
