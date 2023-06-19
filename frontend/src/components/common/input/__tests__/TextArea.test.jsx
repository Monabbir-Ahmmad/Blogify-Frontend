import { render, screen } from "@testing-library/react";

import TextArea from "../TextArea";

describe("TextArea", () => {
  it("should render the TextArea component with label and placeholder", () => {
    const label = "Description";
    const placeholder = "Enter your description here";

    render(
      <TextArea label={label} placeholder={placeholder} name="description" />
    );

    const textAreaLabel = screen.getByText(label);
    const textAreaInput = screen.getByPlaceholderText(placeholder);

    expect(textAreaLabel).toBeInTheDocument();
    expect(textAreaInput).toBeInTheDocument();
  });

  it("should render the TextArea component with helper text", () => {
    const helperText = "Maximum length: 100 characters";

    render(
      <TextArea
        label="Description"
        placeholder="Enter your description here"
        name="description"
        helperText={helperText}
      />
    );

    const textAreaHelperText = screen.getByText(helperText);

    expect(textAreaHelperText).toBeInTheDocument();
  });

  it("should add custom classNames to the TextArea component", () => {
    const customClass = "custom-class";

    render(
      <TextArea
        label="Description"
        placeholder="Enter your description here"
        name="description"
        className={customClass}
      />
    );

    const textAreaInput = screen.getByRole("textbox");

    expect(textAreaInput).toHaveClass(customClass);
  });

  it("should display error styles when error prop is provided", () => {
    const errorText = "Field is required";

    render(
      <TextArea
        label="Description"
        placeholder="Enter your description here"
        name="description"
        error={true}
        helperText={errorText}
      />
    );

    const textAreaInput = screen.getByRole("textbox");
    const errorTextElement = screen.getByText(errorText);

    expect(textAreaInput).toHaveClass("input-error");
    expect(errorTextElement).toHaveClass("text-error");
  });
});
