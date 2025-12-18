import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/pages/login/ui";
import { AuthProvider } from "@/provider/auth-provider/ui";
import { TodosPage } from "@/pages/todo/ui";
import { todoListQueryParamsSchema } from "@/entities/todos/api";
import { RouterErrorBoundary } from "@/shared/ui/error-boundary";
import { validateLocationSearch } from "@/shared/lib/validate-location-search";

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
        loader: (ctx) => {
          return validateLocationSearch(
            ctx.request.url,
            todoListQueryParamsSchema,
          );
        },
        ErrorBoundary: RouterErrorBoundary,
      },
    ],
  },
]);
