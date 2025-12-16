import type {ViewModelConstructor} from "@/shared/lib/create-use-store.ts";
import type {TodosPageModel} from "@/pages/todo/provider";
import {makeAutoObservable, runInAction} from "mobx";
import {withAsync} from "@/shared/lib/withAsync.ts";
import {http} from "@/shared/http";
import {MOCK_TODOS} from "@/entities/todos/api";

type ViewModel = ViewModelConstructor<TodosPageModel>;

export class TodoListVM implements ViewModel {

  constructor(public context: TodosPageModel) {
    makeAutoObservable(this, {context: false, loadTodos: false}, {autoBind: true})
  }

  loadTodos = withAsync(async () => {
    try {
      const todoList = await http.get('/api/todos', MOCK_TODOS);
      runInAction(() => {
        this.context.todoModel.todoList = todoList;
      })
    }catch {
      console.log('error')
    }
  })

  async beforeMount () {
    await this.loadTodos();
  }

  deleteTodo (id: number) {
    this.context.todoModel.todoList = this.context.todoModel.todoList.filter((todo) => todo.id !== id);
  }
}