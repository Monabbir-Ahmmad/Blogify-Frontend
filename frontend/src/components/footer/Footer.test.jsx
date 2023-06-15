import { render, screen } from "@testing-library/react";

import Footer from "./Footer";
import { MemoryRouter } from "react-router-dom";

describe("Footer", () => {
  it("renders the footer links correctly", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const aboutLink = screen.getByRole("link", { name: "About" });
    const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });
    const licensingLink = screen.getByRole("link", { name: "Licensing" });
    const contactLink = screen.getByRole("link", { name: "Contact" });

    expect(aboutLink.getAttribute("href")).toBe("/");
    expect(privacyLink.getAttribute("href")).toBe("/");
    expect(licensingLink.getAttribute("href")).toBe("/");
    expect(contactLink.getAttribute("href")).toBe("/");
  });

  it("renders the copyright text correctly", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const copyrightText = screen.getByText((content, element) => {
      const hasLink = element.querySelector("a") !== null;
      const expectedText = "© 2023 Blogify™. All Rights Reserved.";

      return hasLink && element.textContent.trim() === expectedText;
    });

    expect(copyrightText).toBeInTheDocument();

    expect(screen.getByText("Blogify™").closest("a")).toHaveAttribute(
      "href",
      "/"
    );
  });
});
