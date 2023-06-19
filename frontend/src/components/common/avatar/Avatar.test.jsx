import { render, screen } from "@testing-library/react";

import Avatar from "./Avatar";

describe("Avatar", () => {
  it("should render the avatar with title and subtitle correctly", () => {
    const title = "John Doe";
    const subtitle = "Software Engineer";

    render(<Avatar title={title} subtitle={subtitle} />);

    const avatarImage = screen.getByAltText("Avatar");
    const titleElement = screen.getByRole("heading", { level: 5, name: title });
    const subtitleElement = screen.getByText(subtitle);

    expect(avatarImage).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });

  it("should render the avatar without title and subtitle correctly", () => {
    render(<Avatar />);

    const avatarImage = screen.getByAltText("Avatar");
    const titleElement = screen.queryByRole("heading");
    const subtitleElement = screen.queryByText(/subtitle/i);

    expect(avatarImage).toBeInTheDocument();
    expect(titleElement).not.toBeInTheDocument();
    expect(subtitleElement).not.toBeInTheDocument();
  });
});
