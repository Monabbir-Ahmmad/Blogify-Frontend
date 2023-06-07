import {
  RiCake2Line as BirthDateIcon,
  RiCalendar2Line as CalendarIcon,
  RiLandscapeLine as CoverImageIcon,
  RiEditBoxLine as EditIcon,
  RiMailLine as EmailIcon,
  RiGenderlessLine as GenderIcon,
  RiShieldKeyholeLine as PasswordIcon,
  RiAccountCircleLine as ProfileIcon,
  RiCameraLensLine as ProfileImageIcon,
} from "react-icons/ri";
import { useRef, useState } from "react";

import Popover from "../common/popover/Popover";
import avatarPlaceholder from "../../assets/avatarPlaceholder.svg";
import coverImagePlaceholder from "../../assets/coverImagePlaceholder.svg";
import dayjs from "dayjs";

function ProfileDetails({ user }) {
  const editBtnRef = useRef();
  const [editMenuOpen, setEditMenuOpen] = useState(false);
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
      <div className="container -mt-40 px-6 sm:px-10 relative flex flex-col gap-6 bg-white shadow-xl rounded-lg">
        <div className="relative flex justify-center">
          <img
            alt=""
            src={user?.profileImage ?? avatarPlaceholder}
            className="-top-20 bg-background absolute shadow-xl rounded-full h-40 aspect-square border-none"
          />
          <div className="w-full pt-10 px-6 flex flex-col gap-6 md:flex-row-reverse mt-24 md:mt-0 md:px-12 items-center justify-between">
            <button
              className="w-full px-14 md:w-fit btn-primary self-center"
              onClick={() => setEditMenuOpen((prev) => !prev)}
              ref={editBtnRef}
            >
              Edit Profile
              <EditIcon size={20} />
            </button>

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
                <span className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary">
                  <ProfileImageIcon size={20} />
                  Edit profile image
                </span>
                <span className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary">
                  <CoverImageIcon size={20} />
                  Edit cover image
                </span>
                <span className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary">
                  <ProfileIcon size={20} />
                  Update info
                </span>
                <span className="inline-flex items-center gap-5 py-4 px-5 hover:bg-primaryLighter hover:text-primary">
                  <PasswordIcon size={20} />
                  Update passsword
                </span>
              </div>
            </Popover>

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
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center text-center">
          <h1 className="text-4xl font-semibold">{user?.name}</h1>
          <h5 className="flex gap-2 mb-6 font-bold opacity-70">
            <EmailIcon size={20} />
            {user?.email}
          </h5>
          <h6 className="flex gap-2 uppercase">
            <GenderIcon size={20} />
            {user?.gender ?? "Gender unspecified"}
          </h6>
          <h6 className="flex gap-2 uppercase">
            <BirthDateIcon size={20} />
            {user?.birthDate
              ? `Born on ${dayjs(user?.birthDate).format("MMMM DD, YYYY")}`
              : "Data of birth unspecified"}
          </h6>
          <h6 className="flex gap-2 uppercase">
            <CalendarIcon size={20} />
            Joined on {dayjs(user?.createdAt).format("MMMM DD, YYYY")}
          </h6>
        </div>
        <div className="flex justify-center items-center mt-6 pt-10 pb-16 sm:px-10 border-t text-center">
          <p className="opacity-80 leading-relaxed w-full lg:w-9/12">
            {user?.bio ?? "No bio available"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProfileDetails;
