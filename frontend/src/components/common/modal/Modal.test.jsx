import { fireEvent, render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import Modal from "./Modal";

describe("Modal", () => {
  const onCloseMock = vitest.fn();

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render the Modal component with children when isOpen is true", () => {
    const childText = "Modal content";

    render(
      <MemoryRouter>
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>{childText}</div>
        </Modal>
      </MemoryRouter>
    );

    const modalContent = screen.getByText(childText);

    expect(modalContent).toBeInTheDocument();
  });

  it("should not render the Modal component when isOpen is false", () => {
    const childText = "Modal content";

    render(
      <MemoryRouter>
        <Modal isOpen={false} onClose={onCloseMock}>
          <div>{childText}</div>
        </Modal>
      </MemoryRouter>
    );

    const modalContent = screen.queryByText(childText);

    expect(modalContent).not.toBeInTheDocument();
  });

  it("should call onClose when Escape key is pressed", () => {
    render(
      <MemoryRouter>
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Modal content</div>
        </Modal>
      </MemoryRouter>
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("should call onClose when clicking outside the modal", () => {
    render(
      <MemoryRouter>
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Modal content</div>
        </Modal>
      </MemoryRouter>
    );

    fireEvent.click(document);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("should call onClose when location changes", () => {
    render(
      <MemoryRouter>
        <Modal isOpen={true} onClose={onCloseMock}>
          <div>Modal content</div>
        </Modal>
      </MemoryRouter>
    );

    fireEvent.popState(window);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
