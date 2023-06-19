import { fireEvent, render, screen } from "@testing-library/react";

import ImageEditor from "./ImageEditor";
import { vi } from "vitest";

describe("ImageEditor", () => {
  const imageUrl = "https://example.com/image.jpg";
  const onChange = vi.fn();

  beforeEach(() => {
    onChange.mockClear();
    vi.clearAllMocks();
  });

  it("should render the image editor correctly", () => {
    render(<ImageEditor imageUrl={imageUrl} onChange={onChange} />);

    const cropperElement = screen.getByRole("img", { src: imageUrl });
    const zoomSlider = screen.getByLabelText("Zoom");

    expect(cropperElement).toBeInTheDocument();
    expect(zoomSlider).toBeInTheDocument();
  });

  it("should update the zoom value correctly", () => {
    render(<ImageEditor imageUrl={imageUrl} onChange={onChange} />);

    const zoomSlider = screen.getByLabelText("Zoom");

    fireEvent.change(zoomSlider, { target: { value: "2" } });

    expect(zoomSlider.value).toBe("2");
  });
});
