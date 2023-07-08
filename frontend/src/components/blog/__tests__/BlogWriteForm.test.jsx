import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import BlogWriteForm from "../BlogWriteForm";
import SunEditor from "suneditor";
import { toast } from "react-toastify";

vitest.mock("react-toastify", async () => ({
  ...(await vitest.importActual("react-toastify")),
  toast: {
    error: vitest.fn(),
    success: vitest.fn(),
  },
}));

vitest.mock("suneditor", () => ({
  default: {
    create: () => ({
      destroy: () => {},
      enable: () => {},
      util: { isIE: false },
      toolbar: {
        hide: () => {},
        disable: () => {},
        show: () => {},
        enable: () => {},
      },
      getContents: () => "Contents",
      getCharCount: () => 8,
      readOnly: () => {},
      setDefaultStyle: () => {},
      appendContents: () => {},
      setContents: () => {},
      setOptions: () => {},
      disable: () => {},
      hide: () => {},
      show: () => {},
      core: {
        focusEdge: () => {},
        context: {
          element: { wysiwyg: { blur: () => {}, focus: () => {} } },
        },
      },
    }),
  },
}));

vitest.mock("suneditor/src/plugins", () => ({
  default: [],
}));

describe("BlogWriteForm", () => {
  const mockOnSubmit = vitest.fn();
  const mockOnFormReset = vitest.fn();

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should render the blog write form correctly", () => {
    render(
      <BlogWriteForm onSubmit={mockOnSubmit} onFormReset={mockOnFormReset} />
    );
    const formTitle = screen.getByText(/Write a new blog/i);
    const formSubmitButton = screen.getByRole("button", { name: /publish/i });
    expect(formTitle).toBeInTheDocument();
    expect(formSubmitButton).toBeInTheDocument();
  });

  it("should render the form title correctly when in edit mode", () => {
    render(
      <BlogWriteForm
        onSubmit={mockOnSubmit}
        onFormReset={mockOnFormReset}
        isEditMode={true}
      />
    );
    const formTitle = screen.getByText(/Edit your blog/i);
    expect(formTitle).toBeInTheDocument();
  });

  it("should call onSubmit with form data when the form is submitted", async () => {
    render(
      <BlogWriteForm onSubmit={mockOnSubmit} onFormReset={mockOnFormReset} />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your title"), {
      target: { value: "Test Blog Title" },
    });
    fireEvent.click(screen.getByRole("button", { name: /publish/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it("should show an error toast if the form is submitted without blog title", async () => {
    render(
      <BlogWriteForm onSubmit={mockOnSubmit} onFormReset={mockOnFormReset} />
    );

    fireEvent.click(screen.getByRole("button", { name: /publish/i }));

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
      expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    });
  });

  it("should display an error toast if the form is submitted without blog content", async () => {
    vitest.spyOn(SunEditor, "create").mockImplementation(() => ({
      getCharCount: () => 0,
      destroy: () => {},
    }));

    render(
      <BlogWriteForm onSubmit={mockOnSubmit} onFormReset={mockOnFormReset} />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your title"), {
      target: { value: "Test Blog Title" },
    });

    const formSubmitButton = screen.getByRole("button", { name: /publish/i });
    fireEvent.click(formSubmitButton);

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Blog content is required", {
        toastId: "Blog content is required",
      });
    });
  });
});
