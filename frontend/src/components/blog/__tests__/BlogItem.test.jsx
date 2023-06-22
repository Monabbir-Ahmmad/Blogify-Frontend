import { BrowserRouter, useActionData } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { fireEvent, render, screen } from "@testing-library/react";

import { AuthContext } from "../../../contexts/AuthContext";
import BlogItem from "../BlogItem";
import { ModalContextProvider } from "../../../contexts/ModalContext";
import useBlogAction from "../../../hooks/useBlogAction";

const authData = {
  id: 123,
};

const blog = {
  id: 1,
  title: "Test Blog",
  likes: [],
  commentCount: 0,
  user: {
    id: 123,
    name: "John Doe",
    profileImage: "profile.jpg",
  },
  createdAt: "2023-06-19T12:00:00.000Z",
  content: "<p>Test content</p>",
};

vitest.mock("../../../hooks/useBlogAction", () => ({
  default: vitest.fn(() => ({
    blogDeleteMutation: {
      mutate: vitest.fn(),
    },
  })),
}));

const renderWithWrapper = (ui, { ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => {
    return (
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <AuthContext.Provider value={{ authData }}>
            <ModalContextProvider>{children}</ModalContextProvider>
          </AuthContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  };
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

describe("BlogItem", () => {
  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render the blog item correctly", () => {
    renderWithWrapper(<BlogItem blog={blog} />);

    const title = screen.getByText("Test Blog");
    const author = screen.getByText("John Doe");
    const readingTime = screen.getByText(/read/i);

    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(readingTime).toBeInTheDocument();
  });

  it("should call the onBlogClick callback when the blog item is clicked", () => {
    renderWithWrapper(<BlogItem blog={blog} />);

    const blogItem = screen.getByTestId("blog-item-click-area");

    fireEvent.click(blogItem);

    expect(window.location.pathname).toBe("/blog/1");
  });

  it("should call the onAuthorClick callback when the author is clicked", () => {
    renderWithWrapper(<BlogItem blog={blog} />);

    const author = screen.getByText("John Doe");
    fireEvent.click(author);

    expect(window.location.pathname).toBe("/profile/123");
  });

  it("should not show menu button when the user is not the blog owner", () => {
    renderWithWrapper(
      <BlogItem blog={{ ...blog, user: { ...blog.user, id: 1 } }} />
    );

    const menuButton = screen.queryByTestId("menu-button");

    expect(menuButton).not.toBeInTheDocument();
  });

  it("should call the go to blog edit page when edit option is clicked", () => {
    renderWithWrapper(<BlogItem blog={blog} />);

    const menuButton = screen.getByTestId("menu-button");
    fireEvent.click(menuButton);

    const editOption = screen.getByRole("menuitem", { name: /edit/i });
    fireEvent.click(editOption);

    expect(window.location.pathname).toBe("/blog/edit/1");
  });

  it("should open the delete confirmation dialog when delete option is clicked", () => {
    renderWithWrapper(<BlogItem blog={blog} />);

    const mutateMock = vitest.fn();

    useBlogAction.mockImplementation(() => ({
      blogDeleteMutation: {
        mutate: mutateMock,
      },
    }));

    const menuButton = screen.getByTestId("menu-button");
    fireEvent.click(menuButton);

    const deleteOption = screen.getByRole("menuitem", { name: /delete/i });
    fireEvent.click(deleteOption);

    const confirmationDialog = screen.getByText("Delete Blog");

    expect(confirmationDialog).toBeInTheDocument();

    const confirmButton = screen.getByRole("button", { name: /delete/i });

    fireEvent.click(confirmButton);

    expect(mutateMock).toHaveBeenCalledWith(blog.id);
  });

  it("should show the blog as liked when the user has liked the blog", () => {
    renderWithWrapper(
      <BlogItem blog={{ ...blog, likes: [{ userId: 123 }] }} />
    );

    const likeContainer = screen.getByText("1");

    expect(likeContainer).toHaveClass("text-primary");
  });

  it("should show the blog as not liked when the user has not liked the blog", () => {
    renderWithWrapper(<BlogItem blog={{ ...blog, likes: [{ userId: 0 }] }} />);

    const likeContainer = screen.getByText("1");

    expect(likeContainer).not.toHaveClass("text-primary");
  });
});
