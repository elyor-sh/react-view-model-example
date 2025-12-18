import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/pages/login/ui";
import { AuthProvider } from "@/provider/auth-provider/ui";
import { TodosPage } from "@/pages/todo/ui";
import { todoListQueryParamsSchema } from "@/entities/todos/api";
import { parseQueryParamsFromUrl } from "@/shared/lib/query-params.ts";
import { RouterErrorBoundary } from "@/shared/ui/error-boundary.tsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "",
    element: <AuthProvider />,
    loader: (ctx) => {
      console.log(ctx);
    },
    children: [
      {
        path: "",
        element: <TodosPage />,
        loader: (ctx) =>
          todoListQueryParamsSchema.parse(
            parseQueryParamsFromUrl(ctx.request.url),
          ),
        ErrorBoundary: RouterErrorBoundary,
      },
    ],
  },
]);
