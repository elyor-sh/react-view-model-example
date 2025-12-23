import "./globals.css";
import { RouterProvider } from "react-router";
import { GlobalContext } from "@/app/globals.ts";
import { Toaster } from "sonner";
import { useInitApp } from "@/app/use-init-app.ts";

export const App = () => {
  const { globals, router } = useInitApp();

  return (
    <GlobalContext value={globals}>
      <Toaster />
      <RouterProvider router={router} />
    </GlobalContext>
  );
};
