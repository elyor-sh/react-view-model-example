import {createBrowserRouter} from "react-router";
import {LoginPage} from "@/pages/login/ui";
import {AuthProvider} from "@/provider/auth-provider/ui";
import {TodosPage} from "@/pages/todo/ui";

export const router = createBrowserRouter([
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