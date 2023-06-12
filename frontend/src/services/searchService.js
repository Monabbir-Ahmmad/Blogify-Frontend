import apiUrl from "../constants/apiUrl";
import httpClient from "../utils/httpClient";

class SearchService {
  async get({ keyword, type, page, limit }) {
    if (type === "blog") return await this.getBlogs(keyword, { page, limit });

    return await this.getUsers(keyword, { page, limit });
  }

  async getBlogs(keyword, { page, limit }) {
    const res = await httpClient.get(apiUrl.search.getBlogs + `/${keyword}`, {
      params: {
        page,
        limit,
      },
    });

    return res.data;
  }

  async getUsers(keyword, { page, limit }) {
    const res = await httpClient.get(apiUrl.search.getUsers + `/${keyword}`, {
      params: {
        page,
        limit,
      },
    });

    return res.data;
  }
}

export default new SearchService();
