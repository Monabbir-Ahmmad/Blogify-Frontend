import { fireEvent, render, screen } from "@testing-library/react";

import { AuthContext } from "../../../contexts/AuthContext";
import ProfileDetails from "../ProfileDetails";
import dayjs from "dayjs";
import { vi } from "vitest";

describe("ProfileDetails", () => {
  const user = {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    gender: "Male",
    birthDate: "1990-01-01",
    createdAt: "2021-01-01",
    bio: "A short bio about me",
    blogCount: 10,
    commentCount: 20,
    profileImage: "profile-image.jpg",
    coverImage: "cover-image.jpg",
  };

  const onEditPrfileImageMock = vi.fn();
  const onEditCoverImageMock = vi.fn();
  const onEditProfileMock = vi.fn();
  const onEditPasswordMock = vi.fn();

  it("should render the profile details correctly", () => {
    render(
      <AuthContext.Provider value={{ authData: { id: 1 } }}>
        <ProfileDetails
          user={user}
          onEditPrfileImage={onEditPrfileImageMock}
          onEditCoverImage={onEditCoverImageMock}
          onEditProfile={onEditProfileMock}
          onEditPassword={onEditPasswordMock}
        />
      </AuthContext.Provider>
    );

    const profileImage = screen.getByAltText(user.name);
    const nameHeading = screen.getByRole("heading", {
      level: 1,
      name: user.name,
    });
    const emailSpan = screen.getByText(user.email);
    const genderSpan = screen.getByText(user.gender);
    const birthDateSpan = screen.getByText(
      `Born on ${dayjs(user.birthDate).format("MMMM DD, YYYY")}`
    );
    const createdAtSpan = screen.getByText(
      `Joined on ${dayjs(user.createdAt).format("MMMM DD, YYYY")}`
    );
    const bioParagraph = screen.getByText(user.bio);
    const editProfileButton = screen.getByText("Edit Profile");

    expect(profileImage).toBeInTheDocument();
    expect(nameHeading).toBeInTheDocument();
    expect(emailSpan).toBeInTheDocument();
    expect(genderSpan).toBeInTheDocument();
    expect(birthDateSpan).toBeInTheDocument();
    expect(createdAtSpan).toBeInTheDocument();
    expect(bioParagraph).toBeInTheDocument();
    expect(editProfileButton).toBeInTheDocument();
  });

  it("should call the respective edit functions when the edit buttons are clicked", () => {
    render(
      <AuthContext.Provider value={{ authData: { id: 1 } }}>
        <ProfileDetails
          user={user}
          onEditPrfileImage={onEditPrfileImageMock}
          onEditCoverImage={onEditCoverImageMock}
          onEditProfile={onEditProfileMock}
          onEditPassword={onEditPasswordMock}
        />
      </AuthContext.Provider>
    );

    const editProfileButton = screen.getByText("Edit Profile");
    fireEvent.click(editProfileButton);

    const editProfileImageOption = screen.getByText("Edit profile image");
    const editCoverImageOption = screen.getByText("Edit cover image");
    const updateInfoOption = screen.getByText("Update info");
    const updatePasswordOption = screen.getByText("Update passsword");

    fireEvent.click(editProfileImageOption);
    expect(onEditPrfileImageMock).toHaveBeenCalled();

    fireEvent.click(editCoverImageOption);
    expect(onEditCoverImageMock).toHaveBeenCalled();

    fireEvent.click(updateInfoOption);
    expect(onEditProfileMock).toHaveBeenCalled();

    fireEvent.click(updatePasswordOption);
    expect(onEditPasswordMock).toHaveBeenCalled();
  });

  it("should not render the edit button when the user is not the authenticated user", () => {
    render(
      <AuthContext.Provider value={{ authData: { id: 2 } }}>
        <ProfileDetails
          user={user}
          onEditPrfileImage={onEditPrfileImageMock}
          onEditCoverImage={onEditCoverImageMock}
          onEditProfile={onEditProfileMock}
          onEditPassword={onEditPasswordMock}
        />
      </AuthContext.Provider>
    );

    const editProfileButton = screen.queryByText("Edit Profile");
    expect(editProfileButton).not.toBeInTheDocument();
  });
});
