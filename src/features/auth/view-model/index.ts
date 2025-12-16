import type {ViewModelConstructor} from "@/shared/lib/create-use-store.ts";
import type {GlobalContextType} from "@/app/globals.ts";
import {makeAutoObservable, runInAction} from "mobx";
import {http} from "@/shared/http";
import type {NavigateFunction} from "react-router";
import type {ChangeEvent} from "react";
import {withAsync} from "@/shared/lib/withAsync.ts";

type ViewModel = ViewModelConstructor<GlobalContextType>;

type Props = {
  navigate: NavigateFunction
}

type Form = {
  email: string;
  password: string;
}

export class LoginVM implements ViewModel {

  form: Form = {
    email: '',
    password: ''
  }

  constructor(public context: GlobalContextType, public props: Props) {
    makeAutoObservable(this, {context: false, props: false, login: false}, {autoBind: true})
  }

  setForm (e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name as keyof Form;
    this.form[name] = e.target.value;
  }

  login = withAsync(async () => {
    const user = await http.post('/api/login', this.form)
    runInAction(() => {
      this.context.session.email = user.email;
      this.context.session.loginDate = new Date().toISOString();
    })
    localStorage.setItem('user', JSON.stringify(this.context.session));
    this.props.navigate('/');
  })

  beforeMount () {
    this.context.session.email = '';
    this.context.session.loginDate = '';
  }
}