import "./index.css";
import "./style/tailwind.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import BlogPage from "./pages/BlogPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import React from "react";
import ReactDOM from "react-dom/client";
import SearchPage from "./pages/SearchPage";
import WritePage from "./pages/WritePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/write",
        element: <WritePage />,
      },
      {
        path: "/profile/:userId",
        element: <ProfilePage />,
      },
      {
        path: "/blog/:blogId",
        element: <BlogPage />,
      },
      {
        path: "/search/:keyword",
        element: <SearchPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
