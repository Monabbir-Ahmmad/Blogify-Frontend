import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
  useIsMutating,
} from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import LoadingPage from "../LoadingPage";

const renderWithWrapper = (
  ui,
  { authContextData = {}, ...renderOptions } = {}
) => {
  const Wrapper = ({ children }) => {
    return (
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          {children}
        </QueryClientProvider>
      </BrowserRouter>
    );
  };
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

vitest.mock("@tanstack/react-query", async () => ({
  ...(await vitest.importActual("@tanstack/react-query")),
  useIsFetching: vitest.fn(),
  useIsMutating: vitest.fn(),
}));

describe("LoadingPage", () => {
  const mockUseIsFetching = vitest.fn();
  const mockUseIsMutating = vitest.fn();

  beforeEach(() => {
    useIsFetching.mockImplementation(mockUseIsFetching);
    useIsMutating.mockImplementation(mockUseIsMutating);
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render LoadingOverlay when there are ongoing fetch requests", () => {
    mockUseIsFetching.mockReturnValue(true);
    mockUseIsMutating.mockReturnValue(false);

    renderWithWrapper(<LoadingPage />);

    expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
    expect(screen.getByText("loading")).toBeInTheDocument();
  });

  it("should render LoadingOverlay when there are ongoing requests", () => {
    mockUseIsFetching.mockReturnValue(false);
    mockUseIsMutating.mockReturnValue(false);

    renderWithWrapper(<LoadingPage />);

    expect(screen.queryByTestId("loading-icon")).not.toBeInTheDocument();
    expect(screen.queryByText("loading")).not.toBeInTheDocument();
  });
});
