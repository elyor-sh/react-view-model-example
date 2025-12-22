import "./globals.css";
import { RouterProvider } from "react-router";
import { GlobalContext } from "@/app/globals.ts";
import { observer } from "mobx-react-lite";
import { Toaster } from "sonner";
import { useInitApp } from "@/app/use-init-app.ts";

export const App = observer(() => {
  const { globals, router } = useInitApp();

  return (
    <GlobalContext value={globals}>
      <Toaster />
      <RouterProvider router={router} />
    </GlobalContext>
  );
});

App.displayName = "App";
