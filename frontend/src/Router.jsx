import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import notFoundImg from "./assets/notFound.svg";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage hideLink={true} />,
      lazy: async () => ({
        Component: (await import("./App")).default,
      }),
      children: [
        {
          path: "/",
          lazy: async () => ({
            Component: (await import("./pages/LandingPage")).default,
          }),
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
      ],
    },
    {
      path: "*",
      element: (
        <ErrorPage
          image={notFoundImg}
          title="Sorry! We couldn't find the page you are looking for."
          description="Please, make sure you have typed the correct URL."
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
