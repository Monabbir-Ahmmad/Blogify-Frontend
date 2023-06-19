import { fireEvent, render, screen } from "@testing-library/react";

import Input from "../Input";

describe("Input", () => {
  const inputProps = {
    name: "test-input",
    type: "text",
    label: "Test Input",
    placeholder: "Enter value",
    helperText: "Helper text",
  };

  it("should render the input correctly", () => {
    render(<Input {...inputProps} />);

    const inputElement = screen.getByLabelText("Test Input");
    const labelElement = screen.getByText("Test Input");
    const helperTextElement = screen.getByText("Helper text");

    expect(inputElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(helperTextElement).toBeInTheDocument();
  });

  it("should toggle password visibility when password type is used", () => {
    render(<Input {...inputProps} type="password" />);

    const inputElement = screen.getByLabelText("Test Input");
    const toggleButton = screen.getByRole("button");

    expect(inputElement.type).toBe("password");

    fireEvent.click(toggleButton);

    expect(inputElement.type).toBe("text");

    fireEvent.click(toggleButton);

    expect(inputElement.type).toBe("password");
  });
});
