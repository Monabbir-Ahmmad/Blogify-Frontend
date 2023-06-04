import apiUrl from "../constants/apiUrl";
import httpClient from "../utils/httpClient";

class CommentService {
  async post(blogId, text, parentId) {
    text = text.trim();

    const res = await httpClient.post(apiUrl.comment.create, {
      blogId,
      text,
      parentId,
    });

    return res.data;
  }

  async update(id, text) {
    text = text.trim();

    const res = await httpClient.putForm(apiUrl.comment.update + `/${id}`, {
      text,
    });

    return res.data;
  }

  async delete(id) {
    const res = await httpClient.delete(apiUrl.comment.delete + `/${id}`);

    return res.data;
  }

  async get(id) {
    const res = await httpClient.get(apiUrl.comment.get + `/${id}`);

    return res.data;
  }

  async getListByBlog(blogId, { page, limit }) {
    const res = await httpClient.get(
      apiUrl.comment.getListByBlog + `/${blogId}?page=${page}&limit=${limit}`
    );

    return res.data;
  }

  async getReplies(commentId, { page, limit }) {
    const res = await httpClient.get(
      apiUrl.comment.getReplies + `/${commentId}?page=${page}&limit=${limit}`
    );

    return res.data;
  }

  async like(id) {
    const res = await httpClient.put(apiUrl.comment.like + `/${id}`);

    return res.data;
  }
}

export default new CommentService();
