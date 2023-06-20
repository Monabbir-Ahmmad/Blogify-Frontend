import { fireEvent, render, screen } from "@testing-library/react";

import ImagePickerForm from "../ImagePickerForm";
import { vi } from "vitest";

describe("ImagePickerForm", () => {
  const defaultImage = "default-image.jpg";
  const onSubmitMock = vi.fn();

  it("should render the image picker form correctly", () => {
    render(
      <ImagePickerForm
        defaultImage={defaultImage}
        onSubmit={onSubmitMock}
        avatarPicker={false}
      />
    );

    const fileDrop = screen.getByTestId("file-drop");
    const imageEditor = screen.getByRole("img");
    const updateImageButton = screen.getByRole("button", {
      name: "Update Image",
    });
    const removeImageButton = screen.getByRole("button", {
      name: "Remove Image",
    });

    expect(fileDrop).toBeInTheDocument();
    expect(imageEditor).toBeInTheDocument();
    expect(updateImageButton).toBeInTheDocument();
    expect(removeImageButton).toBeInTheDocument();
  });

  it("should call the onSubmit function with the edited image when the update button is clicked", () => {
    render(
      <ImagePickerForm
        defaultImage={defaultImage}
        onSubmit={onSubmitMock}
        avatarPicker={false}
      />
    );

    const updateImageButton = screen.getByRole("button", {
      name: "Update Image",
    });
    fireEvent.click(updateImageButton);

    expect(onSubmitMock).toHaveBeenCalled();
  });

  it("should call the onSubmit function with null when the remove button is clicked", () => {
    render(
      <ImagePickerForm
        defaultImage={defaultImage}
        onSubmit={onSubmitMock}
        avatarPicker={false}
      />
    );

    const removeImageButton = screen.getByRole("button", {
      name: "Remove Image",
    });
    fireEvent.click(removeImageButton);

    expect(onSubmitMock).toHaveBeenCalledWith(null);
  });
});
