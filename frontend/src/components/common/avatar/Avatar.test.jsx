import { render, screen } from "@testing-library/react";

import Avatar from "./Avatar";

describe("Avatar", () => {
  const image = "avatar-image.jpg";
  const title = "John Doe";
  const subtitle = "Software Engineer";

  it("should render the avatar with title and subtitle correctly", () => {
    render(<Avatar image={image} title={title} subtitle={subtitle} />);

    const avatarImage = screen.getByAltText("Avatar");
    const titleElement = screen.getByText(title);
    const subtitleElement = screen.getByText(subtitle);

    expect(avatarImage).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });

  it("should render the avatar without subtitle correctly", () => {
    render(<Avatar image={image} title={title} />);

    const avatarImage = screen.getByAltText("Avatar");
    const titleElement = screen.getByText(title);
    const subtitleElement = screen.queryByText(subtitle);

    expect(avatarImage).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).not.toBeInTheDocument();
  });

  it("should render the avatar without title and subtitle correctly", () => {
    render(<Avatar image={image} />);

    const avatarImage = screen.getByAltText("Avatar");
    const titleElement = screen.queryByText(title);
    const subtitleElement = screen.queryByText(subtitle);

    expect(avatarImage).toBeInTheDocument();
    expect(titleElement).not.toBeInTheDocument();
    expect(subtitleElement).not.toBeInTheDocument();
  });
});
