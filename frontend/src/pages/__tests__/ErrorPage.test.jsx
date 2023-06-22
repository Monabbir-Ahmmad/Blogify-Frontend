import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage";

describe("ErrorPage", () => {
  it("should render the error page correctly with default props", () => {
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    );

    const imageElement = screen.getByRole("img");
    const titleElement = screen.getByRole("heading", { level: 2 });
    const descriptionElement = screen.getByText(
      "Looks like something went wrong. Please try again later."
    );
    const linkElement = screen.getByRole("link", { name: "Take me home!" });

    expect(imageElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  it("should render the error page with custom props", () => {
    render(
      <BrowserRouter>
        <ErrorPage
          image="custom-error-image.svg"
          title="Custom Title"
          description="Custom description"
          hideLink={true}
        />
      </BrowserRouter>
    );

    const imageElement = screen.getByRole("img");
    const titleElement = screen.getByRole("heading", { level: 2 });
    const descriptionElement = screen.getByText("Custom description");
    const linkElement = screen.queryByRole("link");

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("data", "custom-error-image.svg");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe("Custom Title");
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.textContent).toBe("Custom description");
    expect(linkElement).not.toBeInTheDocument();
  });

  it("should render the error page without link", () => {
    render(
      <BrowserRouter>
        <ErrorPage hideLink={true} />
      </BrowserRouter>
    );

    const linkElement = screen.queryByRole("link");

    expect(linkElement).not.toBeInTheDocument();
  });
});
