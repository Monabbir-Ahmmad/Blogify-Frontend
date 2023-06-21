import { RiHome2Line, RiUserLine } from "react-icons/ri";
import { fireEvent, render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import NavLinks from "../NavLinks";

const links = [
  { to: "/", icon: RiHome2Line, text: "Home", sideNavOnly: false },
  { to: "/profile", icon: RiUserLine, text: "Profile", sideNavOnly: true },
];

describe("NavLinks", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <NavLinks links={links} />
      </BrowserRouter>
    );
  });

  it("should render all non-sideNavOnly links", () => {
    const homeLink = screen.getByRole("link", { name: "Home" });
    const profileLink = screen.queryByRole("link", { name: "Profile" });

    expect(homeLink).toBeInTheDocument();
    expect(profileLink).not.toBeInTheDocument();
  });

  it("should apply the correct classes to the NavLink", () => {
    const homeLink = screen.getByText("Home");

    fireEvent.click(homeLink);

    expect(window.location.pathname).toBe("/");
  });
});
