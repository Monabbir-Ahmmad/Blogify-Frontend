import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";

import { AuthContext } from "../../../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { CommentContext } from "../../../contexts/CommentContext";
import CommentTree from "../CommentTree";
import { ModalContextProvider } from "../../../contexts/ModalContext";

const comments = {
  root: {
    children: [1, 2],
  },
  1: {
    id: 1,
    text: "Test comment 1",
    likes: [],
    replyCount: 0,
    user: {
      id: 123,
      name: "John Doe",
      profileImage: "profile.jpg",
    },
    createdAt: "2023-06-19T12:00:00.000Z",
    updatedAt: "2023-06-19T12:00:00.000Z",
    children: [],
  },
  2: {
    id: 2,
    text: "Test comment 2",
    likes: [],
    replyCount: 0,
    user: {
      id: 456,
      name: "Jane Smith",
      profileImage: "profile.jpg",
    },
    createdAt: "2023-06-19T12:00:00.000Z",
    updatedAt: "2023-06-19T12:00:00.000Z",
    children: [],
  },
};

const renderWithWrapper = (ui) => {
  const Wrapper = ({ children }) => {
    return (
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <ModalContextProvider>
            <AuthContext.Provider
              value={{ authData: { id: 123 }, isAuthenticated: true }}
            >
              <CommentContext.Provider
                value={{
                  comments,
                }}
              >
                {children}
              </CommentContext.Provider>
            </AuthContext.Provider>
          </ModalContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  };

  return render(ui, { wrapper: Wrapper });
};

describe("CommentTree", () => {
  it("should render the comments in the correct tree structure", () => {
    renderWithWrapper(<CommentTree commentIds={comments.root.children} />);

    const comment1 = screen.getByText("Test comment 1");
    const comment2 = screen.getByText("Test comment 2");

    expect(comment1).toBeInTheDocument();
    expect(comment2).toBeInTheDocument();
  });

  it("should not render anything when there are no commentIds provided", () => {
    renderWithWrapper(<CommentTree commentIds={[]} />);

    const comments = screen.queryAllByRole("paragraph");
    expect(comments.length).toBe(0);
  });
});
