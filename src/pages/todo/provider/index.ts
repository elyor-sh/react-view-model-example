import {createContext} from "react";
import {TodosModel} from "@/entities/todos/model";
import {createUseStore} from "@/shared/lib/create-use-store.ts";

export class TodosPageModel {
  todoModel: TodosModel;

  constructor() {
    this.todoModel = new TodosModel();
  }
}

export const TodosPageContext = createContext<TodosPageModel | undefined>(undefined);

export const useTodosPageStore = createUseStore(TodosPageContext);

export type TodosPageContextType = TodosPageModel;
