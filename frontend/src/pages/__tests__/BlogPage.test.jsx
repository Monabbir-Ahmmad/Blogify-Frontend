import {
  BrowserRouter,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ModalContextProvider, useModal } from "../../contexts/ModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";

import { AuthContext } from "../../contexts/AuthContext";
import BlogPage from "../BlogPage";
import { ThemeContextProvider } from "../../contexts/ThemeContext";
import { toast } from "react-toastify";
import useBlogAction from "../../hooks/useBlogAction";

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
              <ThemeContextProvider>{children}</ThemeContextProvider>
            </ModalContextProvider>
          </AuthContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  };
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

vitest.mock("react-router-dom", async () => ({
  ...(await vitest.importActual("react-router-dom")),
  useParams: vitest.fn(),
  useNavigate: vitest.fn(),
  useSearchParams: vitest.fn(),
}));

vitest.mock("react-toastify", async () => ({
  ...(await vitest.importActual("react-toastify")),
  toast: {
    info: vitest.fn(),
    success: vitest.fn(),
  },
}));

vitest.mock("../../hooks/useBlogAction", () => ({
  default: vitest.fn(() => ({
    fetchBlog: vitest.fn(),
    blogLikeMutation: { mutate: vitest.fn() },
    blogDeleteMutation: { mutate: vitest.fn() },
  })),
}));

vitest.mock("../../contexts/ModalContext", async () => ({
  ...(await vitest.importActual("../../contexts/ModalContext")),
  useModal: vitest.fn(() => ({
    openModal: vitest.fn(),
    closeModal: vitest.fn(),
  })),
}));

describe("BlogPage", () => {
  const mockData = {
    id: 1,
    title: "test title",
    content: "test content",
    createdAt: "2021-08-23T15:06:38.000Z",
    updatedAt: "2021-08-23T15:06:39.000Z",
    user: {
      id: 1,
      name: "test name",
    },
    likes: [],
    commentCount: 0,
  };
  const mockParams = { blogId: 1 };
  const mockNavigate = vitest.fn();
  const mockUseSearchParams = [
    {
      get: vitest.fn(() => 1),
    },
    vitest.fn(),
  ];
  const mockFetchBlog = vitest.fn(() => ({
    data: mockData,
    isError: false,
  }));
  const mockBlogLikeMutation = { mutate: vitest.fn() };
  const mockBlogDeleteMutation = { mutate: vitest.fn() };
  const mockOpenModal = vitest.fn();
  const mockCloseModal = vitest.fn();

  beforeEach(() => {
    Element.prototype.scrollIntoView = vitest.fn();
    useParams.mockReturnValue(mockParams);
    useNavigate.mockReturnValue(mockNavigate);
    useSearchParams.mockReturnValue(mockUseSearchParams);
    useBlogAction.mockImplementation(() => ({
      fetchBlog: mockFetchBlog,
      blogLikeMutation: mockBlogLikeMutation,
      blogDeleteMutation: mockBlogDeleteMutation,
    }));
    useModal.mockImplementation(() => ({
      openModal: mockOpenModal,
      closeModal: mockCloseModal,
    }));
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render the BlogPage correctly when data is null", () => {
    useBlogAction.mockImplementation(() => ({
      fetchBlog: vitest.fn(() => ({
        data: null,
        isError: true,
      })),
    }));

    renderWithWrapper(<BlogPage />);

    expect(screen.getByTestId("error-page")).toBeInTheDocument();
    expect(
      screen.getByText("Sorry, we couldn't find the blog you were looking for.")
    ).toBeInTheDocument();
  });

  it("should render the BlogPage correctly when data is not null", () => {
    renderWithWrapper(<BlogPage />);

    expect(screen.getByAltText("Cover Image")).toBeInTheDocument();
    expect(screen.getByText(mockData.title)).toBeInTheDocument();
    expect(screen.getByText(mockData.content)).toBeInTheDocument();
    expect(screen.getByText("Published")).toBeInTheDocument();
    expect(screen.getByText("Updated")).toBeInTheDocument();
    expect(screen.getByText(mockData.user.name)).toBeInTheDocument();
    expect(screen.getByAltText("Avatar")).toBeInTheDocument();
    expect(screen.getByTestId("like-button")).toBeInTheDocument();
    expect(screen.getByTestId("comment-button")).toBeInTheDocument();
  });

  it("should show info toast when liking a blog without authentication", () => {
    renderWithWrapper(<BlogPage />);

    fireEvent.click(screen.getByTestId("like-button"));

    expect(toast.info).toHaveBeenCalledWith(
      "You must be logged in to like a blog",
      {
        toastId: "login-to-like-blog",
      }
    );
  });

  it("should call blogLikeMutation when liking a blog with authentication", () => {
    renderWithWrapper(<BlogPage />, {
      authContextData: { isAuthenticated: true },
    });

    fireEvent.click(screen.getByTestId("like-button"));

    expect(mockBlogLikeMutation.mutate).toHaveBeenCalledWith(mockParams.blogId);
  });

  it("should open confirmation dialog when deleting a blog with authentication", () => {
    renderWithWrapper(<BlogPage />, {
      authContextData: {
        isAuthenticated: true,
        authData: {
          id: 1,
        },
      },
    });

    fireEvent.click(screen.getByTestId("menu-button"));
    fireEvent.click(screen.getByRole("menuitem", { name: "Delete" }));

    expect(mockOpenModal).toHaveBeenCalledWith(expect.any(Object));
  });

  it("should call blogDeleteMutation and navigate back when confirming blog deletion", () => {
    renderWithWrapper(<BlogPage />, {
      authContextData: {
        isAuthenticated: true,
        authData: {
          id: 1,
        },
      },
    });

    fireEvent.click(screen.getByTestId("menu-button"));
    fireEvent.click(screen.getByRole("menuitem", { name: "Delete" }));

    const onConfirm = mockOpenModal.mock.calls[0][0].props.onConfirm;
    onConfirm();

    expect(mockBlogDeleteMutation.mutate).toHaveBeenCalledWith(
      mockParams.blogId,
      expect.any(Object)
    );
  });

  it("should call navigate to blog edit page when clicking on edit button", () => {
    renderWithWrapper(<BlogPage />, {
      authContextData: {
        isAuthenticated: true,
        authData: {
          id: 1,
        },
      },
    });

    fireEvent.click(screen.getByTestId("menu-button"));
    fireEvent.click(screen.getByRole("menuitem", { name: "Edit" }));

    expect(mockNavigate).toHaveBeenCalledWith(
      `/blog/edit/${mockParams.blogId}`
    );
  });

  it("should open comment section when clicking on comment button", () => {
    renderWithWrapper(<BlogPage />);

    fireEvent.click(screen.getByTestId("comment-button"));

    expect(
      screen.getByTestId("comment-page").classList.contains("opacity-100")
    ).toBe(true);
  });
});
