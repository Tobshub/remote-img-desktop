// import { invoke } from "@tauri-apps/api/tauri";
import React from "react";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import IndexPage from "./pages";
import AuthPage from "./pages/auth";
import clientToken from "./utils/token";

const router = createBrowserRouter([
  {
    index: true,
    element: <IndexPage />,
  },
  {
    path: "auth",
    element: <AuthPage />,
    loader: async ({ request }) => {
      const url = new URL(request.url);
      const intendedUrlPath = url.searchParams.get("cb");
      return { intendedUrlPath };
    },
  },
  {
    path: "/",
    loader: async ({ request }) => {
      // redirect to auth route if not authenticated
      if (!clientToken.get()) {
        const intendedUrlPath = new URL(request.url).pathname;
        return redirect(`/auth?cb=${encodeURIComponent(intendedUrlPath)}`);
      }
      return null;
    },
    children: [
      {
        path: "upload",
      },
      {
        path: "images",
      },
      {
        path: "sign-out",
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
