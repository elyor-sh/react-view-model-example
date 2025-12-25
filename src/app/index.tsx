import "./globals.css";
import { RouterProvider } from "react-router";
import { GlobalContext } from "@/app/globals.ts";
import { useInitApp } from "@/app/use-init-app.ts";
import { Toaster } from "@/shared/ui/sonner.tsx";

export const App = () => {
  const { globals, router } = useInitApp();

  return (
    <GlobalContext value={globals}>
      <Toaster />
      <RouterProvider router={router} />
    </GlobalContext>
  );
};
