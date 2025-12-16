import {makeAutoObservable} from "mobx";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export class TodosModel {
  todoList: Todo[] = [];

  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true});
  }
}