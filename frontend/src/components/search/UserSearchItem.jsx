import Avatar from "../common/avatar/Avatar";
import { Link } from "react-router-dom";
import coverImagePlaceholder from "../../assets/coverImagePlaceholder.svg";
import dayjs from "dayjs";

function UserSearchItem({ user }) {
  return (
    <section className="w-full flex flex-col overflow-hidden rounded-lg shadow-lg shadow-shadow">
      {user?.coverImage ? (
        <img
          alt={user?.name}
          src={user?.coverImage}
          className="w-full h-28 object-cover"
        />
      ) : (
        <object
          data={coverImagePlaceholder}
          type="image/svg+xml"
          className="w-full h-28 overflow-hidden"
        />
      )}
      <div className="w-full flex-1 max-w-5xl px-6 relative flex flex-col gap-4 bg-paper pb-4">
        <div className="relative">
          <Avatar
            image={user?.profileImage}
            rounded="rounded-full"
            avatarSize="h-28"
            className="-top-12 absolute ring-4 ring-paper"
          />
        </div>
        <div className="space-y-2 text-sm ml-32 mb-2.5">
          <h1 className="text-lg font-semibold">{user?.name}</h1>

          <span className="uppercase">
            Joined on {dayjs(user?.createdAt).format("MMMM DD, YYYY")}
          </span>
        </div>

        <Link
          className="btn-primary-outlined rounded-lg mt-auto"
          to={"/profile/" + user.id}
        >
          View Profile
        </Link>
      </div>
    </section>
  );
}

export default UserSearchItem;
