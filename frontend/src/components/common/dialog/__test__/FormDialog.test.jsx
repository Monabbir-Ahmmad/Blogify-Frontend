import { fireEvent, render, screen } from "@testing-library/react";

import FormDialog from "../FormDialog";
import { vi } from "vitest";

describe("FormDialog", () => {
  const onCancel = vi.fn();
  const title = "Edit Profile";
  const childElement = <input type="text" placeholder="Username" />;

  beforeEach(() => {
    render(
      <FormDialog onCancel={onCancel} title={title}>
        {childElement}
      </FormDialog>
    );
  });

  it("should render the form dialog correctly", () => {
    const titleElement = screen.getByText(title);
    const closeButton = screen.getByRole("button");

    expect(titleElement).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  it("should call the onCancel function when close button is clicked", () => {
    const closeButton = screen.getByRole("button");

    fireEvent.click(closeButton);

    expect(onCancel).toHaveBeenCalled();
  });

  it("should render the child element correctly", () => {
    const childInputElement = screen.getByPlaceholderText("Username");

    expect(childInputElement).toBeInTheDocument();
  });
});
