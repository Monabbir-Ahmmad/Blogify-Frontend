import { fireEvent, render, screen } from "@testing-library/react";

import ConfirmationDialog from "../ConfirmationDialog";

describe("ConfirmationDialog", () => {
  const onCancel = vitest.fn();
  const onConfirm = vitest.fn();
  const title = "Delete Item";
  const description = "Are you sure you want to delete this item?";
  const confirmText = "Confirm";
  const cancelText = "Cancel";

  beforeEach(() => {
    render(
      <ConfirmationDialog
        onCancel={onCancel}
        onConfirm={onConfirm}
        title={title}
        description={description}
        confirmText={confirmText}
        cancelText={cancelText}
      />
    );
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render the confirmation dialog correctly", () => {
    const titleElement = screen.getByText(title);
    const descriptionElement = screen.getByText(description);
    const confirmButton = screen.getByRole("button", { name: confirmText });
    const cancelButton = screen.getByRole("button", { name: cancelText });

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it("should call the onCancel function when cancel button is clicked", () => {
    const cancelButton = screen.getByRole("button", { name: cancelText });

    fireEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalled();
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("should call the onConfirm function when confirm button is clicked", () => {
    const confirmButton = screen.getByRole("button", { name: confirmText });

    fireEvent.click(confirmButton);

    expect(onConfirm).toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
  });
});
