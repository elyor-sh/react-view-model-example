import { createContext } from "react";
import { SessionModel } from "@/entities/session/model";
import { createUseStore } from "@/shared/lib/create-use-store.ts";
import type { AppRouter } from "@/provider/router-provider/model";

export class Globals {
  session: SessionModel;
  router: AppRouter;

  constructor(router: AppRouter) {
    this.router = router;
    this.session = new SessionModel();
  }
}

export const GlobalContext = createContext<Globals | undefined>(undefined);

export const useGlobalStore = createUseStore(GlobalContext);

export type GlobalContextType = Globals;
