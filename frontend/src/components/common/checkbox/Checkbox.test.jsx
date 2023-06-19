import { render, screen } from "@testing-library/react";

import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  it("should render the checkbox with label correctly", () => {
    const label = "Agree to terms";

    render(<Checkbox label={label} />);

    const checkboxElement = screen.getByLabelText(label);

    expect(checkboxElement).toBeInTheDocument();
  });
});
