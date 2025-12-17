import "./globals.css"
import {RouterProvider} from "react-router";
import {useEffect, useState} from "react";
import {GlobalContext, Globals} from "@/app/globals.ts";
import {AppRouter} from "@/provider/router-provider/model";
import {observer} from "mobx-react-lite";
import {router} from "@/app/router.tsx";
import {Toaster} from "sonner";

export const App = observer(() => {
  const [appRouter] = useState(() => new AppRouter(router.state.location, router.state.matches, router.navigate))
  const [globals] = useState(() => new Globals(appRouter))

  useEffect(() => {
    const unsubscribe = router.subscribe(appRouter.subscribe)
    return () => unsubscribe()
  }, [appRouter.subscribe]);

  return (
    <GlobalContext value={globals}>
      <Toaster />
      <RouterProvider router={router} />
    </GlobalContext>
  )
})

App.displayName = "App";
