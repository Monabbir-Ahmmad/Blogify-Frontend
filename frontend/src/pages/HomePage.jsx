import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import BlogItem from "../components/blog/BlogItem";
import ConfirmationDialog from "../components/common/dialog/ConfirmationDialog";
import Pagination from "../components/common/pagination/Pagination";
import blogService from "../services/blogService";
import { toast } from "react-toastify";
import { useModal } from "../components/common/modal/ModalService";
import { useState } from "react";

function HomePage() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 12;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();

  const { data: paginatedData } = useQuery({
    queryKey: ["getBlogs", { page, limit }],
    queryFn: async () => await blogService.getList({ page, limit }),
  });

  const blogDeleteMutation = useMutation({
    mutationFn: blogService.delete,
    onSuccess: (data, variables) => {
      toast.success("Blog deleted successfully");
      queryClient.invalidateQueries(["getBlogs", { page, limit }]);
      queryClient.removeQueries(["getBlog", variables]);
    },
  });

  const onEditClick = (id) => navigate(`/blog/edit/${id}`);

  const onDeleteClick = (id) =>
    openModal(
      <ConfirmationDialog
        type="danger"
        onConfirm={() => {
          blogDeleteMutation.mutate(id);
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
    <section className="p-5 w-full inline-flex justify-center">
      <div className="max-w-[1400px] w-full space-y-5">
        <h1 className="text-4xl font-semibold">
          Welcome to <span className="text-primary">Blogify</span>
        </h1>

        <p className="text-base opacity-80 uppercase">View recent blogs</p>

        <hr />

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
            currentPage={page}
            totalPages={paginatedData?.pageCount}
            onPageChange={(nextPage) => navigate(`?page=${nextPage}`)}
          />
        </div>
      </div>
    </section>
  );
}

export default HomePage;
