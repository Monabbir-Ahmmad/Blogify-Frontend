import apiUrl from "../constants/apiUrl";
import httpClient from "../utils/httpClient";
import storageService from "./storageService";

class UserService {
  async getCurrentUser() {
    const authData = storageService.getAuthData();
    if (!authData) return null;

    const res = await httpClient.get(apiUrl.user.get + `/${authData.userId}`);

    storageService.setCurrentUser(res.data);

    return res.data;
  }

  async getUser(id) {
    const res = await httpClient.get(apiUrl.user.get + `/${id}`);

    return res.data;
  }

  async updateProfile({ id, name, email, gender, birthDate, bio }) {
    const res = await httpClient.put(apiUrl.user.update + `/${id}`, {
      name,
      email,
      gender,
      birthDate,
      bio,
    });

    return res.data;
  }

  async updatePassword(id, oldPassword, newPassword) {
    const res = await httpClient.put(apiUrl.user.updatePassword + `/${id}`, {
      oldPassword,
      newPassword,
    });

    return res.data;
  }

  async updateProfileImage(id, profileImage) {
    const formData = new FormData();
    formData.append("profileImage", profileImage);

    const res = await httpClient.put(
      apiUrl.user.updateProfileImage + `/${id}`,
      formData
    );

    return res.data;
  }

  async updateCoverImage(id, coverImage) {
    const formData = new FormData();
    formData.append("coverImage", coverImage);

    const res = await httpClient.put(
      apiUrl.user.updateCoverImage + `/${id}`,
      formData
    );

    return res.data;
  }

  async deleteProfile(id, password) {
    const res = await httpClient.post(apiUrl.user.delete + `/${id}`, {
      password,
    });

    return res.data;
  }
}

export default new UserService();
