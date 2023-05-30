import apiUrl from "../constants/apiUrl";
import httpClient from "../utils/httpClient";

class AuthService {
  async post({ title, content, coverImage }) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("coverImage", coverImage);

    const res = await httpClient.post(apiUrl.blog.create, formData);

    return res.data;
  }

  async update(id, { title, content, coverImage }) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("coverImage", coverImage);

    const res = await httpClient.put(apiUrl.blog.update + `/${id}`, formData);

    return res.data;
  }

  async delete(id) {
    const res = await httpClient.delete(apiUrl.blog.delete + `/${id}`);

    return res.data;
  }

  async get(id) {
    const res = await httpClient.get(apiUrl.blog.get + `/${id}`);

    return res.data;
  }

  async getList({ page, limit }) {
    const res = await httpClient.get(
      apiUrl.blog.getList + `?page=${page}&limit=${limit}`
    );

    return res.data;
  }

  async getListByUser(id, { page, limit }) {
    const res = await httpClient.get(
      apiUrl.blog.getListByUser + `/${id}?page=${page}&limit=${limit}`
    );

    return res.data;
  }
}

export default new AuthService();
