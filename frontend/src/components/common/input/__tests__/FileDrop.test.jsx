import { fireEvent, render, screen } from "@testing-library/react";

import FileDrop from "../FileDrop";
import { vi } from "vitest";

describe("FileDrop", () => {
  const onChangeMock = vi.fn();

  beforeEach(() => {
    onChangeMock.mockClear();
  });

  it("should render the FileDrop component correctly", () => {
    render(<FileDrop onChange={onChangeMock} value={null} />);

    const dropzone = screen.getByTestId("file-drop");

    expect(dropzone).toBeInTheDocument();
  });

  it("should call the onChange function when a valid file is dropped", () => {
    const file = new File(["test file"], "test.png", { type: "image/png" });
    render(<FileDrop onChange={onChangeMock} value={null} />);

    const dropzone = screen.getByTestId("file-drop");

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    expect(onChangeMock).toHaveBeenCalledWith(file);
  });

  it("should display an alert when an invalid file type is dropped", () => {
    const invalidFile = new File(["test file"], "test.pdf", {
      type: "application/pdf",
    });
    window.alert = vi.fn();
    render(<FileDrop onChange={onChangeMock} value={null} />);

    const dropzone = screen.getByTestId("file-drop");

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [invalidFile],
      },
    });

    expect(window.alert).toHaveBeenCalledWith(
      "Invalid file type. Please choose a valid file type."
    );
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it("should display an alert when the file size exceeds the maximum limit", () => {
    const largeFile = new File(["test file"], "test.png", {
      type: "image/png",
    });
    Object.defineProperty(largeFile, "size", { value: 10 * 1024 * 1024 }); // 10MB
    window.alert = vi.fn();
    render(<FileDrop onChange={onChangeMock} value={null} />);

    const dropzone = screen.getByTestId("file-drop");

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [largeFile],
      },
    });

    expect(window.alert).toHaveBeenCalledWith(
      "File size exceeds the maximum limit of 5120KB."
    );
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it("should call the onChange function with null when the remove button is clicked", () => {
    render(<FileDrop onChange={onChangeMock} value={"test-image.png"} />);

    const removeButton = screen.getByRole("button");

    fireEvent.click(removeButton);

    expect(onChangeMock).toHaveBeenCalledWith(null);
  });
});
