import NotFoundPage from "./NotFoundPage";
import ProfileDetails from "../components/profile/ProfileDetails";
import { useParams } from "react-router-dom";
import useUserActions from "../hooks/useUserActions";

function ProfilePage() {
  const { userId } = useParams();

  const { fetchUser } = useUserActions();

  const { data: user, isError } = fetchUser(userId);

  if (isError) return <NotFoundPage />;

  return (
    <main className="w-full flex flex-col items-center">
      <ProfileDetails user={user} />
    </main>
  );
}

export default ProfilePage;
