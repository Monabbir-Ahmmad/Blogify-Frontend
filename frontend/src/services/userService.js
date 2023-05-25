import apiUrl from "../constants/apiUrl";
import httpClient from "../utils/httpClient";

class UserService {
  async getUser(id) {
    return await httpClient.get(apiUrl.user.get + `/${id}`);
  }

  async updateProfile({ id, name, email, gender, birthDate, bio }) {
    return await httpClient.put(apiUrl.user.update + `/${id}`, {
      name,
      email,
      gender,
      birthDate,
      bio,
    });
  }

  async updatePassword(id, oldPassword, newPassword) {
    return await httpClient.put(apiUrl.user.updatePassword + `/${id}`, {
      oldPassword,
      newPassword,
    });
  }

  async updateProfileImage(id, profileImage) {
    const formData = new FormData();
    formData.append("profileImage", profileImage);

    return await httpClient.put(
      apiUrl.user.updateProfileImage + `/${id}`,
      formData
    );
  }

  async updateCoverImage(id, coverImage) {
    const formData = new FormData();
    formData.append("coverImage", coverImage);

    return await httpClient.put(
      apiUrl.user.updateCoverImage + `/${id}`,
      formData
    );
  }

  async deleteProfile(id, password) {
    return await httpClient.post(apiUrl.user.delete + `/${id}`, { password });
  }
}

export default new UserService();
