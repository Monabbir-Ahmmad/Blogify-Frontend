import ProfileDetails from "../components/profile/ProfileDetails";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useUserActions from "../hooks/useUserActions";
import userService from "../services/userService";

function ProfilePage() {
  const { userId } = useParams();

  const { fetchUser } = useUserActions();

  const { data: user } = fetchUser(userId);

  return (
    <main className="w-full flex flex-col items-center">
      <ProfileDetails user={user} />
    </main>
  );
}

export default ProfilePage;
