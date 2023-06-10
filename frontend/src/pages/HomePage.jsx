import { useNavigate, useSearchParams } from "react-router-dom";

import BlogItem from "../components/blog/BlogItem";
import ConfirmationDialog from "../components/common/dialog/ConfirmationDialog";
import NoResult from "../components/emptyPlaceholder/NoResult";
import Pagination from "../components/common/pagination/Pagination";
import { toast } from "react-toastify";
import useBlogAction from "../hooks/useBlogAction";
import { useModal } from "../contexts/ModalContext";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const limit = searchParams.get("limit") || 12;
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { fetchBlogs, blogDeleteMutation } = useBlogAction();

  const { data: paginatedData } = fetchBlogs({
    page: searchParams.get("page"),
    limit,
  });

  const onEditClick = (id) => navigate(`/blog/edit/${id}`);

  const onDeleteClick = (id) =>
    openModal(
      <ConfirmationDialog
        type="danger"
        onConfirm={() => {
          blogDeleteMutation.mutate(id, {
            onSuccess: () => toast.success("Blog deleted successfully"),
          });
          closeModal();
        }}
        onCancel={closeModal}
        title="Delete Blog"
        description="Are you sure you want to delete this blog? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        className="max-w-lg w-full"
      />
    );

  return (
    <main className="p-5 w-full inline-flex justify-center">
      <section className="container space-y-5">
        <h1 className="text-4xl font-semibold">
          Welcome to <span className="text-primary">Blogify</span>
        </h1>

        <p className="text-base opacity-80 uppercase">Latest Blogs</p>

        <hr />

        {paginatedData?.data.length === 0 && <NoResult />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedData?.data.map((blog) => (
            <BlogItem
              key={blog.id}
              blog={blog}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </div>

        <div className="py-4">
          <Pagination
            currentPage={searchParams.get("page")}
            totalPages={paginatedData?.totalPages}
            onPageChange={(page) => setSearchParams({ page })}
          />
        </div>
      </section>
    </main>
  );
}

export default HomePage;
