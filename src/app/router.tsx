import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/pages/login/ui";
import { AuthProvider } from "@/provider/auth-provider/ui";
import { TodosPage } from "@/pages/todo/ui";
import { todoListQueryParamsSchema } from "@/entities/todos/api";
import { RouterErrorBoundary } from "@/shared/ui/error-boundary";
import { validateLocationSearch } from "@/shared/lib/validate-location-search";
import type { FiltersModel } from "@/provider/filters-provider/model";

export const createAppRouter = (filtersModel: FiltersModel) => {
  return createBrowserRouter([
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
              filtersModel,
              todoListQueryParamsSchema,
            );
          },
          ErrorBoundary: RouterErrorBoundary,
        },
        {
          path: "/users",
          element: <div>Users</div>,
        },
      ],
    },
  ]);
};
