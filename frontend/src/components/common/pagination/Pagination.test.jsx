import { fireEvent, render, screen } from "@testing-library/react";

import Pagination from "./Pagination";

describe("Pagination", () => {
  const onPageChangeMock = vitest.fn();

  const totalPages = 10;

  it("should render the pagination component with correct page numbers", () => {
    const currentPage = 3;

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChangeMock}
      />
    );

    const pageNumbers = screen
      .getAllByRole("button")
      .map((button) => button.textContent.trim());

    expect(pageNumbers).toEqual([
      "Previous",
      "1",
      "2",
      "3",
      "4",
      "5",
      "...",
      "10",
      "Next",
    ]);
  });

  it("should call onPageChange with the correct page number when a page number button is clicked", () => {
    const currentPage = 3;

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChangeMock}
      />
    );

    const pageButton = screen.getByText("4");
    fireEvent.click(pageButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

  it("should call onPageChange with the correct page number when the Previous button is clicked", () => {
    const currentPage = 3;

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChangeMock}
      />
    );

    const previousButton = screen.getByText("Previous");
    fireEvent.click(previousButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(currentPage - 1);
  });

  it("should call onPageChange with the correct page number when the Next button is clicked", () => {
    const currentPage = 3;

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChangeMock}
      />
    );

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(currentPage + 1);
  });

  it("should disable the Previous button when on the first page", () => {
    const currentPage = 1;

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChangeMock}
      />
    );

    const previousButton = screen.getByTestId("previous-button");

    expect(previousButton).toBeDisabled();
  });

  it("should disable the Next button when on the last page", () => {
    const currentPage = 10;

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChangeMock}
      />
    );

    const nextButton = screen.getByTestId("next-button");

    expect(nextButton).toBeDisabled();
  });
});
