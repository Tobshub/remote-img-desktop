import { invoke } from "@tauri-apps/api/tauri";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
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
  },
  {
    path: "/",
    loader: async ({ request }) => {
      // redirect to auth route if not authenticated
      if (!clientToken.get()) {
        const intended_url = new URL(request.url).pathname;
        return redirect(`/auth?cb=${encodeURIComponent(intended_url)}`);
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
