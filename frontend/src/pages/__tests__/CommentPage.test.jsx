import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { AuthContext } from "../../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { CommentContext } from "../../contexts/CommentContext";
import CommentPage from "../CommentPage";
import { ModalContextProvider } from "../../contexts/ModalContext";
import { ThemeContextProvider } from "../../contexts/ThemeContext";
import useCommentAction from "../../hooks/useCommentAction";

const renderWithWrapper = (
  ui,
  { authContextData = {}, ...renderOptions } = {}
) => {
  const Wrapper = ({ children }) => {
    return (
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <AuthContext.Provider value={authContextData}>
            <ModalContextProvider>
              <ThemeContextProvider>
                <CommentContext.Provider
                  value={{
                    comments: {
                      root: {
                        children: [],
                      },
                    },
                  }}
                >
                  {children}
                </CommentContext.Provider>
              </ThemeContextProvider>
            </ModalContextProvider>
          </AuthContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  };
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

vitest.mock("../../hooks/useCommentAction", () => ({
  default: vitest.fn(() => ({
    fetchComments: vitest.fn(),
    commentPostMutation: { mutate: vitest.fn() },
  })),
}));

describe("CommentPage", () => {
  const blogId = "blogId";
  const toggleCommentViewMock = vitest.fn();
  const mockCommentPostMutate = vitest.fn();
  const fetchCommentsMock = vitest.fn(() => ({
    data: {
      data: [],
      pageSize: 12,
      totalItems: 1,
      totalPages: 1,
    },
    refetch: vitest.fn(),
  }));

  beforeEach(() => {
    Element.prototype.scrollIntoView = vitest.fn();
    useCommentAction.mockImplementation(() => ({
      fetchComments: fetchCommentsMock,
      commentPostMutation: {
        mutate: mockCommentPostMutate,
      },
    }));
  });

  afterEach(() => {
    vitest.clearAllTimers();
  });

  it("should render the comment page correctly when open is false", () => {
    renderWithWrapper(<CommentPage blogId={blogId} />);

    expect(
      screen.getByTestId("comment-page").classList.contains("opacity-0")
    ).toBe(true);
  });

  it("should render the comment page correctly when open is true", () => {
    renderWithWrapper(<CommentPage blogId={blogId} open={true} />);

    expect(
      screen.getByTestId("comment-page").classList.contains("opacity-100")
    ).toBe(true);
  });

  it("should show no result when no data is available", () => {
    renderWithWrapper(
      <CommentPage
        blogId={blogId}
        toggleCommentView={toggleCommentViewMock}
        open={true}
      />
    );

    expect(screen.getByTestId("empty-result-image")).toBeInTheDocument();

    expect(screen.getByText("No Comments Yet!!!")).toBeInTheDocument();
  });

  it("should call toggleCommentView when close button is clicked", () => {
    renderWithWrapper(
      <CommentPage
        blogId={blogId}
        toggleCommentView={toggleCommentViewMock}
        open={true}
      />
    );

    fireEvent.click(screen.getByTestId("close-button"));

    expect(toggleCommentViewMock).toHaveBeenCalledTimes(1);
  });

  it("should show the comment box when user is authenticated", () => {
    renderWithWrapper(
      <CommentPage
        blogId={blogId}
        toggleCommentView={toggleCommentViewMock}
        open={true}
      />,
      { authContextData: { isAuthenticated: true } }
    );

    expect(
      screen.getByPlaceholderText("Write a comment...")
    ).toBeInTheDocument();
  });

  it("should not show the comment box when user is not authenticated", () => {
    renderWithWrapper(
      <CommentPage
        blogId={blogId}
        toggleCommentView={toggleCommentViewMock}
        open={true}
      />
    );

    expect(
      screen.queryByPlaceholderText("Write a comment...")
    ).not.toBeInTheDocument();
  });

  it("should call commentPostMutation when a comment is submitted", async () => {
    renderWithWrapper(
      <CommentPage
        blogId={blogId}
        toggleCommentView={toggleCommentViewMock}
        open={true}
      />,
      { authContextData: { isAuthenticated: true } }
    );

    const commentText = "This is a test comment.";

    fireEvent.change(screen.getByPlaceholderText("Write a comment..."), {
      target: { value: commentText },
    });
    fireEvent.click(
      screen.getByRole("button", {
        name: "Submit",
      })
    );

    await waitFor(() => {
      expect(mockCommentPostMutate).toHaveBeenCalledWith({
        blogId,
        text: commentText,
      });
    });
  });
});
