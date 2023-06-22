import { fireEvent, render, screen } from "@testing-library/react";

import Slider from "../Slider";

describe("Slider", () => {
  it("should render the Slider component with label and value", () => {
    const label = "Brightness";
    const value = 50;
    const onChange = vitest.fn();

    render(
      <Slider
        label={label}
        value={value}
        onChange={onChange}
        min={0}
        max={100}
        step={1}
      />
    );

    const sliderLabel = screen.getByText(label);
    const sliderInput = screen.getByRole("slider");

    expect(sliderLabel).toBeInTheDocument();
    expect(sliderInput).toBeInTheDocument();
    expect(sliderInput).toHaveAttribute("value", value.toString());
  });

  it("should display step labels if provided", () => {
    const stepLabel = ["0%", "50%", "100%"];

    render(
      <Slider
        label="Opacity"
        value={50}
        onChange={vitest.fn()}
        min={0}
        max={100}
        step={1}
        stepLabel={stepLabel}
      />
    );

    const stepLabels = screen.getAllByRole("heading");

    expect(stepLabels.length).toBe(stepLabel.length);
    expect(stepLabels[0]).toHaveTextContent(stepLabel[0]);
    expect(stepLabels[1]).toHaveTextContent(stepLabel[1]);
    expect(stepLabels[2]).toHaveTextContent(stepLabel[2]);
  });
});
