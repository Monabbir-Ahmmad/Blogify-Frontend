import { afterEach, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { AuthContext } from "../../../contexts/AuthContext";
import BlogFloatingButton from "../BlogFloatingButton";

describe("BlogFloatingButton", () => {
  const blog = {
    id: 1,
    likes: [],
    commentCount: 0,
    user: {
      id: 123,
    },
  };

  const authData = {
    id: 123,
  };

  const onBlogLikeClick = vi.fn();
  const onBlogCommentClick = vi.fn();
  const onBlogEditClick = vi.fn();
  const onBlogDeleteClick = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the floating button correctly", () => {
    render(
      <AuthContext.Provider value={{ authData }}>
        <BlogFloatingButton
          blog={blog}
          onBlogLikeClick={onBlogLikeClick}
          onBlogCommentClick={onBlogCommentClick}
          onBlogEditClick={onBlogEditClick}
          onBlogDeleteClick={onBlogDeleteClick}
        />
      </AuthContext.Provider>
    );
    const likeButton = screen.getByTestId("like-button");
    const commentButton = screen.getByTestId("comment-button");

    expect(likeButton).toBeInTheDocument();
    expect(commentButton).toBeInTheDocument();
  });

  it("should call the onBlogLikeClick callback when like button is clicked", () => {
    render(
      <AuthContext.Provider value={{ authData }}>
        <BlogFloatingButton
          blog={blog}
          onBlogLikeClick={onBlogLikeClick}
          onBlogCommentClick={onBlogCommentClick}
          onBlogEditClick={onBlogEditClick}
          onBlogDeleteClick={onBlogDeleteClick}
        />
      </AuthContext.Provider>
    );

    const likeButton = screen.getByTestId("like-button");
    fireEvent.click(likeButton);

    expect(onBlogLikeClick).toHaveBeenCalled();
  });

  it("should call the onBlogCommentClick callback when comment button is clicked", () => {
    render(
      <AuthContext.Provider value={{ authData }}>
        <BlogFloatingButton
          blog={blog}
          onBlogLikeClick={onBlogLikeClick}
          onBlogCommentClick={onBlogCommentClick}
          onBlogEditClick={onBlogEditClick}
          onBlogDeleteClick={onBlogDeleteClick}
        />
      </AuthContext.Provider>
    );

    const commentButton = screen.getByTestId("comment-button");
    fireEvent.click(commentButton);

    expect(onBlogCommentClick).toHaveBeenCalled();
  });

  it("should show the menu options when the menu button is clicked", () => {
    render(
      <AuthContext.Provider value={{ authData }}>
        <BlogFloatingButton
          blog={blog}
          onBlogLikeClick={onBlogLikeClick}
          onBlogCommentClick={onBlogCommentClick}
          onBlogEditClick={onBlogEditClick}
          onBlogDeleteClick={onBlogDeleteClick}
        />
      </AuthContext.Provider>
    );

    const menuButton = screen.getByTestId("menu-button");
    fireEvent.click(menuButton);

    const editOption = screen.getByRole("menuitem", { name: /edit/i });
    const deleteOption = screen.getByRole("menuitem", { name: /delete/i });

    expect(editOption).toBeInTheDocument();
    expect(deleteOption).toBeInTheDocument();
  });

  it("should call the onBlogEditClick callback when edit option is clicked", () => {
    render(
      <AuthContext.Provider value={{ authData }}>
        <BlogFloatingButton
          blog={blog}
          onBlogLikeClick={onBlogLikeClick}
          onBlogCommentClick={onBlogCommentClick}
          onBlogEditClick={onBlogEditClick}
          onBlogDeleteClick={onBlogDeleteClick}
        />
      </AuthContext.Provider>
    );

    const menuButton = screen.getByTestId("menu-button");
    fireEvent.click(menuButton);

    const editOption = screen.getByRole("menuitem", { name: /edit/i });
    fireEvent.click(editOption);

    expect(onBlogEditClick).toHaveBeenCalledWith(blog.id);
  });

  it("should call the onBlogDeleteClick callback when delete option is clicked", () => {
    render(
      <AuthContext.Provider value={{ authData }}>
        <BlogFloatingButton
          blog={blog}
          onBlogLikeClick={onBlogLikeClick}
          onBlogCommentClick={onBlogCommentClick}
          onBlogEditClick={onBlogEditClick}
          onBlogDeleteClick={onBlogDeleteClick}
        />
      </AuthContext.Provider>
    );

    const menuButton = screen.getByTestId("menu-button");
    fireEvent.click(menuButton);

    const deleteOption = screen.getByRole("menuitem", { name: /delete/i });
    fireEvent.click(deleteOption);

    expect(onBlogDeleteClick).toHaveBeenCalledWith(blog.id);
  });

  it("should not show the menu options when the menu button is clicked if the user is not the author of the blog", () => {
    render(
      <AuthContext.Provider value={{ id: 1 }}>
        <BlogFloatingButton
          blog={blog}
          onBlogLikeClick={onBlogLikeClick}
          onBlogCommentClick={onBlogCommentClick}
          onBlogEditClick={onBlogEditClick}
          onBlogDeleteClick={onBlogDeleteClick}
        />
      </AuthContext.Provider>
    );

    const menuButton = screen.queryByTestId("menu-button");

    expect(menuButton).not.toBeInTheDocument();
  });
});
