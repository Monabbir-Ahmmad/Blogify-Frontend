import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import UserSearchItem from "../UserSearchItem";
import dayjs from "dayjs";

const mockUser = {
  id: "1",
  name: "John Doe",
  createdAt: "2022-05-10",
  profileImage: "path/to/profileImage.jpg",
  coverImage: "path/to/coverImage.jpg",
};

describe("UserSearchItem", () => {
  it("should render user information correctly with cover image", () => {
    render(
      <MemoryRouter>
        <UserSearchItem user={mockUser} />
      </MemoryRouter>
    );

    const avatarElement = screen.getByAltText(mockUser.name);
    const nameElement = screen.getByText(mockUser.name);
    const joinedElement = screen.getByText(
      `Joined on ${dayjs(mockUser.createdAt).format("MMMM DD, YYYY")}`
    );
    const viewProfileLink = screen.getByText("View Profile");

    expect(avatarElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(joinedElement).toBeInTheDocument();
    expect(viewProfileLink).toBeInTheDocument();
  });

  it("should render user information correctly without cover image", () => {
    render(
      <MemoryRouter>
        <UserSearchItem user={{ ...mockUser, coverImage: null }} />
      </MemoryRouter>
    );

    const avatarElement = screen.queryByAltText(mockUser.name);
    const nameElement = screen.getByText(mockUser.name);
    const joinedElement = screen.getByText(
      `Joined on ${dayjs(mockUser.createdAt).format("MMMM DD, YYYY")}`
    );
    const viewProfileLink = screen.getByText("View Profile");

    expect(avatarElement).not.toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(joinedElement).toBeInTheDocument();
    expect(viewProfileLink).toBeInTheDocument();
  });
});
