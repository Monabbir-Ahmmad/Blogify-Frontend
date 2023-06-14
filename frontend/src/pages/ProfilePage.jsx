import { useParams, useSearchParams } from "react-router-dom";

import BlogItem from "../components/blog/BlogItem";
import ErrorPage from "./ErrorPage";
import FormDialog from "../components/common/dialog/FormDialog";
import ImagePickerForm from "../components/profile/ImagePickerForm";
import NoResult from "../components/emptyPlaceholder/NoResult";
import Pagination from "../components/common/pagination/Pagination";
import PasswordUpdateForm from "../components/profile/PasswordUpdateForm";
import ProfileDetails from "../components/profile/ProfileDetails";
import ProfileUpdateForm from "../components/profile/ProfileUpdateForm";
import notFoundImg from "../assets/notFound.svg";
import { toast } from "react-toastify";
import useBlogAction from "../hooks/useBlogAction";
import { useModal } from "../contexts/ModalContext";
import useUserActions from "../hooks/useUserActions";

function ProfilePage() {
  const { userId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const limit = searchParams.get("limit") || 12;
  const { openModal, closeModal } = useModal();

  const {
    fetchUser,
    profileImageUpdateMutation,
    coverImageUpdateMutation,
    passwordUpdateMutation,
    profileUpdateMutation,
  } = useUserActions();

  const { fetchUserBlogs } = useBlogAction();

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
        className="max-w-xl w-screen"
      >
        <ImagePickerForm
          defaultImage={user.profileImage}
          avatarPicker={true}
          onSubmit={(image) => {
            profileImageUpdateMutation.mutate(
              { userId, image },
              {
                onSuccess: () => {
                  closeModal();
                  toast.success("Profile image updated successfully");
                },
              }
            );
          }}
        />
      </FormDialog>
    );

  const onEditCoverImage = () =>
    openModal(
      <FormDialog
        title="Edit Cover Image"
        onCancel={closeModal}
        className="max-w-xl w-screen"
      >
        <ImagePickerForm
          defaultImage={user.coverImage}
          onSubmit={(image) => {
            coverImageUpdateMutation.mutate(
              { userId, image },
              {
                onSuccess: () => {
                  closeModal();
                  toast.success("Cover image updated successfully");
                },
              }
            );
          }}
        />
      </FormDialog>
    );

  const onEditPassword = () =>
    openModal(
      <FormDialog
        title="Update your password"
        onCancel={closeModal}
        className="max-w-xl w-screen"
      >
        <PasswordUpdateForm
          className="p-4"
          onSubmit={({ oldPassword, newPassword }) => {
            passwordUpdateMutation.mutate(
              { userId, oldPassword, newPassword },
              {
                onSuccess: () => {
                  closeModal();
                  toast.success("Password updated successfully");
                },
              }
            );
          }}
        />
      </FormDialog>
    );

  const onEditProfile = () =>
    openModal(
      <FormDialog
        title="Update your profile"
        onCancel={closeModal}
        className="max-w-xl w-screen"
      >
        <ProfileUpdateForm
          className="p-4"
          defaultValue={user}
          onSubmit={(data) => {
            profileUpdateMutation.mutate(
              { userId, ...data },
              {
                onSuccess: () => {
                  closeModal();
                  toast.success("Profile updated successfully");
                },
              }
            );
          }}
        />
      </FormDialog>
    );

  if (isError)
    return (
      <ErrorPage
        image={notFoundImg}
        title="Sorry! User not found"
        description="The user you are looking for does not exist."
      />
    );

  return (
    <main className="w-full flex flex-col items-center gap-6">
      <ProfileDetails
        user={user}
        onEditPrfileImage={onEditPrfileImage}
        onEditCoverImage={onEditCoverImage}
        onEditPassword={onEditPassword}
        onEditProfile={onEditProfile}
      />

      <section className="w-full max-w-5xl space-y-5 px-5 lg:px-0 mt-10">
        <p className="text-base opacity-80 uppercase">Blogs by {user?.name}</p>

        <hr className="border-divider" />

        {paginatedData?.data.length === 0 && <NoResult />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedData?.data.map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
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
