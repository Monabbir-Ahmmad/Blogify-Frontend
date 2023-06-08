import NotFoundPage from "./NotFoundPage";
import ProfileDetails from "../components/profile/ProfileDetails";
import { useParams } from "react-router-dom";
import useUserActions from "../hooks/useUserActions";
import { useModal } from "../contexts/ModalContext";
import FormDialog from "../components/common/dialog/FormDialog";
import ImageEditor from "../components/common/imageEditor/ImageEditor";

function ProfilePage() {
  const { userId } = useParams();
  const { openModal, closeModal } = useModal();

  const { fetchUser } = useUserActions();

  const { data: user, isError } = fetchUser(userId);

  const onEditPrfileImage = () =>
    openModal(
      <FormDialog
        title="Edit Profile Image"
        onCancel={closeModal}
        className="w-[600px]"
      >
        <div className="p-4 w-full">
          <ImageEditor />
        </div>
      </FormDialog>
    );

  if (isError) return <NotFoundPage />;

  return (
    <main className="w-full flex flex-col items-center">
      <ProfileDetails user={user} onEditPrfileImage={onEditPrfileImage} />
    </main>
  );
}

export default ProfilePage;
