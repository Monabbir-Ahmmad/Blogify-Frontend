import { render, screen } from "@testing-library/react";

import LoadingOverlay from "./LoadingOverlay";

describe("LoadingOverlay", () => {
  it("should render the LoadingOverlay component with default text", () => {
    const icon = "loading.svg";

    render(<LoadingOverlay icon={icon} />);

    const loadingIcon = screen.getByTestId("loading-icon");
    const loadingText = screen.getByText("Loading");

    expect(loadingIcon).toBeInTheDocument();
    expect(loadingIcon).toHaveAttribute("data", icon);
    expect(loadingText).toBeInTheDocument();
  });

  it("should render the LoadingOverlay component with custom text", () => {
    const icon = "loading.svg";
    const customText = "Please wait...";

    render(<LoadingOverlay icon={icon} text={customText} />);

    const loadingText = screen.getByText(customText);

    expect(loadingText).toBeInTheDocument();
  });
});
