import "./globals.css"
import {createBrowserRouter, RouterProvider} from "react-router";
import {AuthProvider} from "@/provider/auth-provider/ui";
import {HomePage} from "@/pages/home/ui";
import {LoginPage} from "@/pages/login/ui";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "",
    element: <AuthProvider />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  }
])

export const App = () => {
  return <RouterProvider router={router} />
}
