import "./globals.css"
import {createBrowserRouter, RouterProvider} from "react-router";
import {AuthProvider} from "@/provider/auth-provider/ui";
import {LoginPage} from "@/pages/login/ui";
import {TodosPage} from "@/pages/todo/ui";

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
        element: <TodosPage />,
      },
    ],
  }
])

export const App = () => {
  return <RouterProvider router={router} />
}
