import type { ViewModelConstructor } from "@/shared/lib/create-use-store.ts";
import type { GlobalContextType } from "@/app/globals.ts";
import { makeAutoObservable } from "mobx";

type ViewModel = ViewModelConstructor<GlobalContextType>;

export class AuthProviderVM implements ViewModel {
  constructor(public context: GlobalContextType) {
    makeAutoObservable(this, { context: false }, { autoBind: true });
  }

  beforeMount() {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        Object.assign(this.context.session, JSON.parse(user));
      }
    } catch {
      console.log("parse error");
    }
  }

  get isLoggedIn() {
    return !!this.context.session.email;
  }
}
