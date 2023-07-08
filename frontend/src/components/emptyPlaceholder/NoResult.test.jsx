import { render, screen } from "@testing-library/react";

import NoResult from "./NoResult";

describe("NoResult", () => {
  it("should render the empty result image and text correctly when no props are passed", () => {
    render(<NoResult />);

    const emptyResultImage = screen.getByTestId("empty-result-image");
    const headingElement = screen.getByRole("heading", {
      level: 1,
      name: /sorry/i,
    });
    const textElement = screen.getByText(/no results found/i);

    expect(emptyResultImage).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  it("should render the empty result image and text correctly when props are passed", () => {
    const title = "Test Title";
    const subtitle = "Test Subtitle";

    render(<NoResult title={title} subtitle={subtitle} />);

    const emptyResultImage = screen.getByTestId("empty-result-image");
    const headingElement = screen.getByRole("heading", {
      level: 1,
      name: title,
    });
    const textElement = screen.getByText(subtitle);

    expect(emptyResultImage).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });
});
