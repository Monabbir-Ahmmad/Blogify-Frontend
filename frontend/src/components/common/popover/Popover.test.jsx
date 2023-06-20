import { afterEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import Popover from "./Popover";

describe("Popover", () => {
  const targetRef = { current: document.createElement("div") };
  const onCloseMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the popover component with children", () => {
    render(
      <Popover target={targetRef} open={true} onClose={onCloseMock}>
        <div>Popover Content</div>
      </Popover>
    );

    const popoverContent = screen.getByText("Popover Content");
    expect(popoverContent).toBeInTheDocument();
  });

  it("should call onClose when clicking outside the popover and target", () => {
    render(
      <div>
        <div>Outside Element</div>
        <Popover target={targetRef} open={true} onClose={onCloseMock}>
          <div>Popover Content</div>
        </Popover>
      </div>
    );

    const outsideElement = screen.getByText("Outside Element");
    fireEvent.mouseDown(outsideElement);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("should not call onClose when clicking inside the popover", () => {
    render(
      <Popover target={targetRef} open={true} onClose={onCloseMock}>
        <div>Popover Content</div>
      </Popover>
    );

    const popoverContent = screen.getByText("Popover Content");
    fireEvent.mouseDown(popoverContent);

    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it("should not call onClose when clicking inside the target element", () => {
    render(
      <div>
        <div ref={targetRef}>Target Element</div>
        <Popover target={targetRef} open={true} onClose={onCloseMock}>
          <div>Popover Content</div>
        </Popover>
      </div>
    );

    const targetElement = screen.getByText("Target Element");
    fireEvent.mouseDown(targetElement);

    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
