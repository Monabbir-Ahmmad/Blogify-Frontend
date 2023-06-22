import { MemoryRouter, useNavigate } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import Searchbar from "../Searchbar";

vitest.mock("react-router-dom", async () => ({
  ...(await vitest.importActual("react-router-dom")),
  useNavigate: vitest.fn(),
}));

describe("Searchbar", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Searchbar />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render the searchbar correctly", () => {
    const searchForm = screen.getByTestId("search-form");
    const searchInput = screen.getByPlaceholderText("Search");

    expect(searchForm).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });

  it("should update the search input value correctly", () => {
    const searchInput = screen.getByPlaceholderText("Search");

    fireEvent.change(searchInput, { target: { value: "react" } });

    expect(searchInput.value).toBe("react");
  });

  it("should navigate to the search results page on form submission", () => {
    const navigateMock = vitest.fn();
    useNavigate.mockImplementation(() => navigateMock);

    const searchForm = screen.getByTestId("search-form");
    const searchInput = screen.getByPlaceholderText("Search");

    fireEvent.change(searchInput, { target: { value: "react" } });
    fireEvent.submit(searchForm);

    expect(navigateMock).toHaveBeenCalledWith("/search/react?type=blog");
  });

  it("should not navigate on form submission if search input is empty", () => {
    const navigateMock = vitest.fn();
    useNavigate.mockImplementation(() => navigateMock);

    const searchForm = screen.getByTestId("search-form");

    fireEvent.submit(searchForm);

    expect(navigateMock).not.toHaveBeenCalled();
  });
});
