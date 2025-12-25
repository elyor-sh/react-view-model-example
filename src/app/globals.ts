import { createContext } from "react";
import { SessionModel } from "@/entities/session/model";
import { createUseStore } from "@/shared/lib/create-use-store.ts";
import type { AppRouter } from "@/provider/router-provider/model";
import { QueryClient } from "@tanstack/query-core";

export class Globals {
  session: SessionModel;
  router: AppRouter;
  queryClient: QueryClient;

  constructor(router: AppRouter) {
    this.router = router;
    this.session = new SessionModel();
    this.queryClient = new QueryClient();
  }
}

export const GlobalContext = createContext<Globals | undefined>(undefined);

export const useGlobalStore = createUseStore(GlobalContext);

export type GlobalContextType = Globals;
