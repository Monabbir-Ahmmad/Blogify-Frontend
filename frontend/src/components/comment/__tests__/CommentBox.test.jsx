import { afterEach, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import CommentBox from "../CommentBox";

describe("CommentBox", () => {
  const onSubmitMock = vi.fn();
  const onCancelMock = vi.fn();
  const scrollIntoViewMock = vi.fn();

  beforeEach(() => {
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    render(<CommentBox onSubmit={onSubmitMock} onCancel={onCancelMock} />);
  });

  afterEach(() => {
    delete Element.prototype.scrollIntoView;
    vi.clearAllMocks();
  });

  it("should render the comment box correctly", () => {
    expect(
      screen.getByPlaceholderText("Write a comment...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("should submit the form with the entered text", () => {
    const textArea = screen.getByPlaceholderText("Write a comment...");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(textArea, { target: { value: "Test comment" } });
    fireEvent.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith("Test comment");
    expect(textArea.value).toBe("");
  });

  it("should call onCancel when cancel button is clicked", () => {
    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    fireEvent.click(cancelButton);

    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  it("should disable submit button when no text is entered", () => {
    const submitButton = screen.getByRole("button", { name: /submit/i });

    expect(submitButton).toBeDisabled();
  });

  it("should enable submit button when text is entered", () => {
    const textArea = screen.getByPlaceholderText("Write a comment...");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(textArea, { target: { value: "Test comment" } });

    expect(submitButton).toBeEnabled();
  });

  it("should display the character count", () => {
    const textArea = screen.getByPlaceholderText("Write a comment...");

    expect(screen.getByText("0 / 500")).toBeInTheDocument();

    fireEvent.change(textArea, { target: { value: "Comment" } });

    expect(screen.getByText("7 / 500")).toBeInTheDocument();
  });

  it("should scroll into view when component is mounted", () => {
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
  });
});
