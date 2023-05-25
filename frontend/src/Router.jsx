import { RouterProvider, createBrowserRouter } from "react-router-dom";

import BlogPage from "./pages/BlogPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import React from "react";
import SearchPage from "./pages/SearchPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import WritePage from "./pages/WritePage";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
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
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/signin",
      element: <SigninPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
