const apiUrl = {
  base: import.meta.env.VITE_API,
  auth: {
    signin: "/auth/signin",
    signup: "/auth/signup",
    signout: "/auth/signout",
    refreshToken: "/auth/refresh-token",
    forgotPassword: "/auth/forgot-password",
  },
  user: {
    get: "/user",
    update: "/user",
    updatePassword: "/user/password",
    updateProfileImage: "/user/profile-image",
    updateCoverImage: "/user/cover-image",
    delete: "/user",
  },

  blog: {
    get: "/blog",
    create: "/blog",
    update: "/blog",
    delete: "/blog",
    like: "/blog",
    getList: "/blog",
    getListByUser: "/blog/user",
  },

  comment: {
    get: "/comment",
    create: "/comment",
    update: "/comment",
    delete: "/comment",
    like: "/comment/like",
    getListByBlog: "/comment/blog",
    getReplies: "/comment/reply",
  },
  search: {
    getUser: "/search/user",
    getBlog: "/search/blog",
  },
};

export default apiUrl;
