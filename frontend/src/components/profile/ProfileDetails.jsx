import {
  RiCake2Line as BirthDateIcon,
  RiCalendar2Line as CalendarIcon,
  RiLandscapeLine as CoverImageIcon,
  RiEditLine as EditIcon,
  RiMailLine as EmailIcon,
  RiGenderlessLine as GenderIcon,
  RiShieldKeyholeLine as PasswordIcon,
  RiAccountCircleLine as ProfileIcon,
  RiCameraLensLine as ProfileImageIcon,
} from "react-icons/ri";
import { useContext, useRef, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import Avatar from "../common/avatar/Avatar";
import Popover from "../common/popover/Popover";
import coverImagePlaceholder from "../../assets/coverImagePlaceholder.svg";
import dayjs from "dayjs";

function ProfileDetails({
  user,
  onEditPrfileImage,
  onEditCoverImage,
  onEditProfile,
  onEditPassword,
}) {
  const editBtnRef = useRef();
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const { authData } = useContext(AuthContext);

  return (
    <section className="w-full flex flex-col justify-center items-center">
      {user?.coverImage ? (
        <img
          alt={user?.name}
          src={user?.coverImage}
          className="w-full h-96 object-cover"
        />
      ) : (
        <object
          data={coverImagePlaceholder}
          type="image/svg+xml"
          className="w-full h-96"
        />
      )}
      <div className="w-full max-w-5xl -mt-40 px-6 sm:px-10 relative flex flex-col gap-6 bg-white shadow-xl rounded-lg">
        <div className="relative flex justify-center">
          <Avatar
            image={user?.profileImage}
            rounded="rounded-full"
            avatarSize="h-40"
            className="-top-20 absolute shadow-xl"
          />
          <div className="w-full pt-6 px-6 flex flex-col-reverse gap-6 md:flex-row mt-24 md:mt-0 md:px-12 items-center justify-between">
            <div className="flex gap-10 tracking-wide text-center text-xl uppercase">
              <div>
                <span className="font-bold block">89</span>
                <span className="text-sm uppercase">Posts</span>
              </div>
              <div>
                <span className="font-bold block">89</span>
                <span className="text-sm uppercase">Comments</span>
              </div>
            </div>

            {authData?.id === user?.id && (
              <button
                className="w-full px-14 md:w-fit btn-primary self-center"
                onClick={() => setEditMenuOpen((prev) => !prev)}
                ref={editBtnRef}
              >
                Edit Profile
                <EditIcon size={20} />
              </button>
            )}

            <Popover
              target={editBtnRef}
              open={editMenuOpen}
              onClose={() => setEditMenuOpen(false)}
              anchor={{
                horizontal: "center",
              }}
              className="bg-white rounded shadow-xl"
            >
              <div className="text-sm flex flex-col">
                <span
                  onClick={onEditPrfileImage}
                  className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary"
                >
                  <ProfileImageIcon size={20} />
                  Edit profile image
                </span>
                <span
                  onClick={onEditCoverImage}
                  className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary"
                >
                  <CoverImageIcon size={20} />
                  Edit cover image
                </span>
                <span
                  onClick={onEditProfile}
                  className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary"
                >
                  <ProfileIcon size={20} />
                  Update info
                </span>
                <span
                  onClick={onEditPassword}
                  className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary"
                >
                  <PasswordIcon size={20} />
                  Update passsword
                </span>
              </div>
            </Popover>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center text-center text-sm">
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <span className="flex gap-2 font-semibold">
            <EmailIcon size={20} />
            {user?.email}
          </span>
          <span className="flex gap-2 uppercase">
            <GenderIcon size={20} />
            {user?.gender ?? "Gender unspecified"}
          </span>
          <span className="flex gap-2 uppercase">
            <BirthDateIcon size={20} />
            {user?.birthDate
              ? `Born on ${dayjs(user?.birthDate).format("MMMM DD, YYYY")}`
              : "Data of birth unspecified"}
          </span>
          <span className="flex gap-2 uppercase">
            <CalendarIcon size={20} />
            Joined on {dayjs(user?.createdAt).format("MMMM DD, YYYY")}
          </span>
        </div>
        <div className="flex justify-center items-center py-6 sm:px-10 border-t text-center text-sm">
          <p className="opacity-80 leading-relaxed w-full lg:w-9/12">
            {user?.bio ?? "No bio available"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProfileDetails;
