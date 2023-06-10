import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import BlogItem from "../components/blog/BlogItem";
import ConfirmationDialog from "../components/common/dialog/ConfirmationDialog";
import FormDialog from "../components/common/dialog/FormDialog";
import ImagePickerForm from "../components/profile/ImagePickerForm";
import NoResult from "../components/emptyPlaceholder/NoResult";
import NotFoundPage from "./NotFoundPage";
import Pagination from "../components/common/pagination/Pagination";
import ProfileDetails from "../components/profile/ProfileDetails";
import { toast } from "react-toastify";
import useBlogAction from "../hooks/useBlogAction";
import { useModal } from "../contexts/ModalContext";
import useUserActions from "../hooks/useUserActions";

function ProfilePage() {
  const { userId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const limit = searchParams.get("limit") || 12;
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  const { fetchUser, profileImageUpdateMutation, coverImageUpdateMutation } =
    useUserActions();

  const { fetchUserBlogs, blogDeleteMutation } = useBlogAction();

  const { data: user, isError } = fetchUser(userId);

  const { data: paginatedData } = fetchUserBlogs(userId, {
    page: searchParams.get("page"),
    limit,
  });

  const onEditPrfileImage = () =>
    openModal(
      <FormDialog
        title="Edit Profile Image"
        onCancel={closeModal}
        className="w-[600px]"
      >
        <ImagePickerForm
          defaultImage={user.profileImage}
          avatarPicker={true}
          onSubmit={(image) => {
            profileImageUpdateMutation.mutate({ userId, image });
            closeModal();
          }}
        />
      </FormDialog>
    );

  const onEditCoverImage = () =>
    openModal(
      <FormDialog
        title="Edit Cover Image"
        onCancel={closeModal}
        className="w-[600px]"
      >
        <ImagePickerForm
          defaultImage={user.coverImage}
          onSubmit={(image) => {
            coverImageUpdateMutation.mutate({ userId, image });
            closeModal();
          }}
        />
      </FormDialog>
    );

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

  if (isError) return <NotFoundPage />;

  return (
    <main className="w-full flex flex-col items-center gap-6">
      <ProfileDetails
        user={user}
        onEditPrfileImage={onEditPrfileImage}
        onEditCoverImage={onEditCoverImage}
      />

      <section className="w-full max-w-5xl space-y-5 px-5 lg:px-0 mt-10">
        <p className="text-base opacity-80 uppercase">Blogs by {user?.name}</p>

        <hr />

        {paginatedData?.data.length === 0 && <NoResult />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

export default ProfilePage;
