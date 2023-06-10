import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      lazy: async () => ({
        Component: (await import("./pages/LandingPage")).default,
      }),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          lazy: async () => ({
            Component: (await import("./pages/HomePage")).default,
          }),
        },
        {
          path: "/write",
          lazy: async () => ({
            Component: (await import("./pages/BlogWritingPage")).default,
          }),
        },
        {
          path: "/blog/edit/:blogId",
          lazy: async () => ({
            Component: (await import("./pages/BlogEditPage")).default,
          }),
        },
        {
          path: "/profile/:userId",
          lazy: async () => ({
            Component: (await import("./pages/ProfilePage")).default,
          }),
        },
        {
          path: "/blog/:blogId",
          lazy: async () => ({
            Component: (await import("./pages/BlogPage")).default,
          }),
        },
        {
          path: "/search/:keyword",
          lazy: async () => ({
            Component: (await import("./pages/SearchPage")).default,
          }),
        },
      ],
    },
    {
      path: "/signup",
      lazy: async () => ({
        Component: (await import("./pages/SignupPage")).default,
      }),
    },
    {
      path: "/signin",
      lazy: async () => ({
        Component: (await import("./pages/SigninPage")).default,
      }),
    },
    {
      path: "/forgot-password",
      lazy: async () => ({
        Component: (await import("./pages/ForgotPasswordPage")).default,
      }),
    },
    {
      path: "/reset-password",
      lazy: async () => ({
        Component: (await import("./pages/ResetPasswordPage")).default,
      }),
    },
    {
      path: "*",
      lazy: async () => ({
        Component: (await import("./pages/NotFoundPage")).default,
      }),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
