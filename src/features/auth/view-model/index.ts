import type { ViewModelConstructor } from "@/shared/lib/create-use-store";
import type { GlobalContextType } from "@/app/globals";
import { runInAction } from "mobx";
import { sleep } from "@/shared/http";
import { withAsync } from "@/shared/lib/withAsync";
import { makeViewModel } from "@/shared/lib/make-view-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/features/auth/api";
import { createForm, createFormState } from "@/shared/lib/form-builder";

type ViewModel = ViewModelConstructor<GlobalContextType>;

export class LoginVM implements ViewModel {
  form = createForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  private state = createFormState(this, this.form.control);

  constructor(public context: GlobalContextType) {
    makeViewModel(this);
  }

  get formState() {
    return this.state.formState;
  }

  login = withAsync(async () => {
    await sleep(1000);
    const user = this.form.getValues();
    runInAction(() => {
      this.context.session.email = user.email;
      this.context.session.loginDate = new Date().toISOString();
    });
    localStorage.setItem("user", JSON.stringify(this.context.session));
    this.context.router.navigate("/");
  });

  beforeMount() {
    this.context.session.email = "";
    this.context.session.loginDate = "";
  }
}
