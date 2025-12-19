import { makeAutoObservable } from "mobx";

export class FiltersModel {
  filters: Record<string, string> = {};
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }
}
