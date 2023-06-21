import { BrowserRouter, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { AuthContext } from "../../../contexts/AuthContext";
import { CommentContext } from "../../../contexts/CommentContext";
import CommentItem from "../CommentItem";
import { ModalContextProvider } from "../../../contexts/ModalContext";

const authContextData = {
  authData: {
    id: 123,
  },
  isAuthenticated: true,
};

const comment = {
  id: 1,
  text: "Test comment",
  likes: [],
  blogId: 1,
  replyCount: 1,
  user: {
    id: 123,
    name: "John Doe",
    profileImage: "profile.jpg",
  },
  createdAt: "2023-06-19T12:00:00.000Z",
  updatedAt: "2023-06-19T12:00:00.000Z",
  children: [2],
};

const reply = {
  id: 2,
  text: "Test reply",
  likes: [],
  blogId: 1,
  parentId: 1,
  replyCount: 0,
  user: {
    id: 1234,
    name: "John Doe 2",
    profileImage: "profile2.jpg",
  },
  createdAt: "2023-06-19T12:00:00.000Z",
  updatedAt: "2023-06-19T12:00:00.000Z",
  children: [],
};

const comments = {
  root: {
    children: [1],
  },
  1: comment,
  2: reply,
};

const fetchReplies = vi.fn(() => ({
  data: {
    data: [],
  },
  refetch: vi.fn(),
}));
const replyPostMutation = { mutate: vi.fn() };
const commentLikeMutation = { mutate: vi.fn() };
const commentDeleteMutation = { mutate: vi.fn() };
const commentEditMutation = { mutate: vi.fn() };

vi.mock("../../../hooks/useCommentAction", () => ({
  default: vi.fn(() => ({
    fetchReplies,
    replyPostMutation,
    commentLikeMutation,
    commentDeleteMutation,
    commentEditMutation,
  })),
}));

const renderWithWrapper = (ui) => {
  const Wrapper = ({ children }) => {
    return (
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <ModalContextProvider>
            <CommentContext.Provider
              value={{
                comments,
              }}
            >
              {children}
            </CommentContext.Provider>
          </ModalContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  };

  return render(ui, { wrapper: Wrapper });
};

describe("CommentItem", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    delete Element.prototype.scrollIntoView;
    vi.clearAllMocks();
  });

  it("should render the comment correctly when user is logged in", () => {
    renderWithWrapper(
      <AuthContext.Provider value={authContextData}>
        <CommentItem comment={comment} level={0} />
      </AuthContext.Provider>
    );

    const commentatorName = screen.getByText("John Doe");
    const commentText = screen.getByText("Test comment");
    const likeButton = screen.getByTestId("like-button");
    const replyButton = screen.getByTestId("reply-button");
    const viewRepliesButton = screen.getByRole("button", {
      name: "View replies",
    });

    expect(commentatorName).toBeInTheDocument();
    expect(commentText).toBeInTheDocument();
    expect(likeButton).toBeInTheDocument();
    expect(replyButton).toBeInTheDocument();
    expect(viewRepliesButton).toBeInTheDocument();
  });

  it("should render the comment correctly when user is not logged in", () => {
    renderWithWrapper(
      <AuthContext.Provider value={{}}>
        <CommentItem comment={comment} level={0} />
      </AuthContext.Provider>
    );

    expect(screen.queryByTestId("menu-button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("reply-button")).not.toBeInTheDocument();
  });

  it("should navigate to the commentator's profile when the commentator's name is clicked", () => {
    renderWithWrapper(
      <AuthContext.Provider value={authContextData}>
        <CommentItem comment={comment} level={0} />
      </AuthContext.Provider>
    );

    const commentatorName = screen.getByText("John Doe");
    fireEvent.click(commentatorName);

    expect(window.location.pathname).toBe("/profile/" + comment.user.id);
  });

  it("should call the commentLikeMutation when the like button is clicked", () => {
    renderWithWrapper(
      <AuthContext.Provider value={authContextData}>
        <CommentItem comment={comment} level={0} />
      </AuthContext.Provider>
    );

    const likeButton = screen.getByTestId("like-button");
    fireEvent.click(likeButton);

    expect(commentLikeMutation.mutate).toHaveBeenCalledWith(comment.id);
  });

  it("should open the reply input when the reply button is clicked", () => {
    renderWithWrapper(
      <AuthContext.Provider value={authContextData}>
        <CommentItem comment={comment} level={0} />
      </AuthContext.Provider>
    );

    const replyButton = screen.getByTestId("reply-button");
    fireEvent.click(replyButton);

    const replyInput = screen.getByPlaceholderText("Write a comment...");
    expect(replyInput).toBeInTheDocument();
  });

  it("should toggle the visibility of replies when the view replies button is clicked", () => {
    renderWithWrapper(
      <AuthContext.Provider value={authContextData}>
        <CommentItem comment={comment} level={0} />
      </AuthContext.Provider>
    );

    const viewRepliesButton = screen.getByRole("button", {
      name: "View replies",
    });
    fireEvent.click(viewRepliesButton);

    expect(fetchReplies).toHaveBeenCalled();

    fireEvent.click(viewRepliesButton);

    expect(fetchReplies).toHaveBeenCalled();
  });

  it("should not show menu button when the user is not the comment owner", () => {
    renderWithWrapper(
      <AuthContext.Provider value={authContextData}>
        <CommentItem comment={reply} level={0} />
      </AuthContext.Provider>
    );

    expect(screen.queryByTestId("menu-button")).not.toBeInTheDocument();
  });

  it("should open the edit input when the edit button is clicked", () => {
    renderWithWrapper(
      <AuthContext.Provider value={authContextData}>
        <CommentItem comment={comment} level={0} />
      </AuthContext.Provider>
    );

    const menuButton = screen.getByTestId("menu-button");
    fireEvent.click(menuButton);

    const editMenu = screen.getByRole("menuitem", { name: "Edit" });
    fireEvent.click(editMenu);

    const editInput = screen.getByRole("textbox", { text: "Test comment" });
    expect(editInput).toBeInTheDocument();
  });

  it("should call the commentEditMutation when the edit form is submitted", () => {
    renderWithWrapper(
      <AuthContext.Provider value={authContextData}>
        <CommentItem comment={comment} level={0} />
      </AuthContext.Provider>
    );

    const menuButton = screen.getByTestId("menu-button");
    fireEvent.click(menuButton);

    const editMenu = screen.getByRole("menuitem", { name: "Edit" });
    fireEvent.click(editMenu);

    const editInput = screen.getByRole("textbox", {
      text: "Test comment",
    });

    fireEvent.change(editInput, { target: { value: "Edit comment" } });

    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.click(submitButton);

    expect(commentEditMutation.mutate).toHaveBeenCalledWith(
      { commentId: comment.id, text: "Edit comment" },
      expect.any(Object)
    );
  });

  it("should call the commentDeleteMutation when the delete button is clicked and confirmed", () => {
    renderWithWrapper(
      <AuthContext.Provider value={authContextData}>
        <CommentItem comment={comment} level={0} />
      </AuthContext.Provider>
    );

    const menuButton = screen.getByTestId("menu-button");
    fireEvent.click(menuButton);

    const deleteMenu = screen.getByRole("menuitem", { name: "Delete" });
    fireEvent.click(deleteMenu);

    const confirmButton = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(confirmButton);

    expect(commentDeleteMutation.mutate).toHaveBeenCalledWith(
      comment.id,
      expect.any(Object)
    );
  });

  it("should call the commentLikeMutation when the like button is clicked by logged in user", () => {
    renderWithWrapper(
      <AuthContext.Provider value={authContextData}>
        <CommentItem comment={comment} level={0} />
      </AuthContext.Provider>
    );

    const likeButton = screen.getByTestId("like-button");
    fireEvent.click(likeButton);

    expect(commentLikeMutation.mutate).toHaveBeenCalledWith(comment.id);
  });

  it("should not call the commentLikeMutation when the like button is clicked by logged out user", () => {
    renderWithWrapper(
      <AuthContext.Provider value={{}}>
        <CommentItem comment={comment} level={0} />
      </AuthContext.Provider>
    );

    const likeButton = screen.getByTestId("like-button");

    fireEvent.click(likeButton);

    expect(commentLikeMutation.mutate).not.toHaveBeenCalled();
  });
});
