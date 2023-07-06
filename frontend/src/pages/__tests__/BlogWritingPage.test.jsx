import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { AuthContext } from "../../contexts/AuthContext";
import BlogWritingPage from "../BlogWritingPage";
import { BrowserRouter } from "react-router-dom";
import { ModalContextProvider } from "../../contexts/ModalContext";
import { ThemeContextProvider } from "../../contexts/ThemeContext";
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

vitest.mock("suneditor", () => ({
  default: {
    create: () => ({
      destroy: () => {},
      enable: () => {},
      util: { isIE: false },
      toolbar: {
        hide: () => {},
        disable: () => {},
        show: () => {},
        enable: () => {},
      },
      getContents: () => "Contents",
      getCharCount: () => 8,
      readOnly: () => {},
      setDefaultStyle: () => {},
      appendContents: () => {},
      setContents: () => {},
      setOptions: () => {},
      disable: () => {},
      hide: () => {},
      show: () => {},
      core: {
        focusEdge: () => {},
        context: {
          element: { wysiwyg: { blur: () => {}, focus: () => {} } },
        },
      },
    }),
  },
}));

vitest.mock("suneditor/src/plugins", () => ({
  default: [],
}));

vitest.mock("../../hooks/useBlogAction", () => ({
  default: vitest.fn(() => ({
    blogCreateMutation: { mutate: vitest.fn() },
  })),
}));

describe("BlogWritingPage", () => {
  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render the page when user is authenticated", () => {
    renderWithWrapper(<BlogWritingPage />, {
      authContextData: {
        isAuthenticated: true,
        authData: { id: 1 },
      },
    });

    expect(
      screen.queryByText("You need to login to access this page")
    ).not.toBeInTheDocument();
    expect(screen.getByText("Write a new blog")).toBeInTheDocument();
  });

  it("should render the error page when user is not authenticated", () => {
    renderWithWrapper(<BlogWritingPage />);

    expect(
      screen.getByText("You need to login to access this page")
    ).toBeInTheDocument();
    expect(screen.queryByText("Write a new blog")).not.toBeInTheDocument();
  });

  it("should call blogCreateMutation when form is submitted", async () => {
    const blogCreateMutation = { mutate: vitest.fn() };

    useBlogAction.mockReturnValue({
      blogCreateMutation,
    });

    renderWithWrapper(<BlogWritingPage />, {
      authContextData: {
        isAuthenticated: true,
        authData: { id: 1 },
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your title"), {
      target: { value: "Test Blog Title" },
    });
    fireEvent.click(screen.getByRole("button", { name: /publish/i }));

    await waitFor(() => {
      expect(blogCreateMutation.mutate).toHaveBeenCalledWith(
        {
          title: "Test Blog Title",
          content: "Contents",
        },
        {
          onSuccess: expect.any(Function),
        }
      );
    });
  });
});
