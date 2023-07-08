import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";

import { AuthContext } from "../../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";
import { ModalContextProvider } from "../../contexts/ModalContext";
import { ThemeContextProvider } from "../../contexts/ThemeContext";
import useBlogAction from "../../hooks/useBlogAction";
import { vitest } from "vitest";

const renderWithWrapper = (
  ui,
  {
    authContextData = {
      authData: {
        id: 1,
      },
      isAuthenticated: true,
    },
    ...renderOptions
  } = {}
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
  useNavigate: vitest.fn(),
}));

vitest.mock("../../hooks/useBlogAction", () => ({
  default: vitest.fn(() => ({
    fetchBlogs: vitest.fn(),
  })),
}));

describe("HomePage", () => {
  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render the BlogItem components for each blog", async () => {
    useBlogAction.mockImplementation(() => ({
      fetchBlogs: vitest.fn(() => ({
        data: {
          data: [
            {
              id: 1,
              title: "title",
              content: "content",
              user: {
                id: 1,
                name: "username",
              },
            },
          ],
          totalItems: 1,
          totalPages: 1,
          pageSize: 12,
        },
      })),
    }));

    renderWithWrapper(<HomePage />);

    const blogItems = await screen.findAllByTestId("blog-item");

    expect(blogItems.length).toBe(1);
  });

  it("should render the NoResult component when there are no blogs", async () => {
    useBlogAction.mockImplementation(() => ({
      fetchBlogs: vitest.fn(() => ({
        data: {
          data: [],
          totalItems: 0,
          totalPages: 0,
          pageSize: 12,
        },
      })),
    }));

    renderWithWrapper(<HomePage />);

    expect(await screen.findByTestId("empty-result-image")).toBeInTheDocument();
  });

  it("should render the Pagination component", () => {
    renderWithWrapper(<HomePage />);

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });
});
