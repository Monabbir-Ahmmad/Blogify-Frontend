import { MemoryRouter, useNavigate } from "react-router-dom";
import { afterEach, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import Searchbar from "../Searchbar";

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: vi.fn(),
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
    vi.clearAllMocks();
  });

  it("should render the searchbar correctly", () => {
    const inputElement = screen.getByPlaceholderText("Search");
    const formElement = screen.getByTestId("search-form");

    expect(inputElement).toBeInTheDocument();
    expect(formElement).toBeInTheDocument();
  });

  it("should update the search value correctly", () => {
    const inputElement = screen.getByPlaceholderText("Search");

    fireEvent.change(inputElement, { target: { value: "example" } });

    expect(inputElement.value).toBe("example");
  });

  it("should submit the search form with the correct URL", () => {
    const mockNavigate = vi.fn();

    useNavigate.mockReturnValue(mockNavigate);

    const inputElement = screen.getByPlaceholderText("Search");
    const formElement = screen.getByTestId("search-form");

    fireEvent.change(inputElement, { target: { value: "example" } });
    fireEvent.submit(formElement);

    expect(mockNavigate).toHaveBeenCalledWith("/search/example?type=blog");
  });
});
