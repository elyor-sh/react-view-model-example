import {makeAutoObservable} from "mobx";

export class SessionModel {
  email: string = '';
  loginDate: string = '';

  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true});
  }
}