import "./globals.css";
import { RouterProvider } from "react-router";
import { GlobalContext } from "@/app/globals.ts";
import { observer } from "mobx-react-lite";
import { router } from "@/app/router.tsx";
import { Toaster } from "sonner";
import { useInitApp } from "@/app/use-init-app.ts";

export const App = observer(() => {
  const globals = useInitApp();

  return (
    <GlobalContext value={globals}>
      <Toaster />
      <RouterProvider router={router} />
    </GlobalContext>
  );
});

App.displayName = "App";
