import type { ViewModelConstructor } from "@/shared/lib/create-use-store.ts";
import type { GlobalContextType } from "@/app/globals.ts";
import type { NavigateFunction } from "react-router";
import { makeAutoObservable } from "mobx";

type ViewModel = ViewModelConstructor<GlobalContextType>;

type Props = {
  navigate: NavigateFunction;
};

export class LogoutVM implements ViewModel {
  constructor(
    public context: GlobalContextType,
    public props: Props,
  ) {
    makeAutoObservable(
      this,
      { context: false, props: false },
      { autoBind: true },
    );
  }

  logout() {
    this.context.session.email = "";
    this.context.session.loginDate = "";
    localStorage.removeItem("user");
    this.props.navigate("/login");
  }
}
