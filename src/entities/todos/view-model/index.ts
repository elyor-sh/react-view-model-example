import {appendAutoRun, type ViewModelConstructor} from "@/shared/lib/create-use-store.ts";
import type {TodosPageContextType} from "@/pages/todo/provider";
import {makeAutoObservable, runInAction} from "mobx";
import {withAsync} from "@/shared/lib/withAsync.ts";
import {http} from "@/shared/http";
import {MOCK_TODOS, todoListQueryParamsSchema} from "@/entities/todos/api";
import type {AppRouter} from "@/provider/router-provider/model";
import {stringifyQueryParams} from "@/shared/lib/query-params.ts";
import {parseError} from "@/shared/lib/parseError";

type ViewModel = ViewModelConstructor<TodosPageContextType>;

type Props = {
  router: AppRouter;
}

export class TodoListVM implements ViewModel {

  constructor(public context: TodosPageContextType, public props: Props) {
    makeAutoObservable(this, {context: false, props: false, loadTodos: false}, {autoBind: true})
    appendAutoRun(this, () => {
      void this.loadTodos();
    })
  }

  loadTodos = withAsync(async () => {
    try {
      const parsed = await todoListQueryParamsSchema.parseAsync(this.props.router.queryParams);
      const todoList = await http.get(`/api/todos?${stringifyQueryParams(parsed)}`, MOCK_TODOS);
      runInAction(() => {
        this.context.todoModel.todoList = todoList;
      })
    }catch (e) {
      parseError(e);
    }
  })

  deleteTodo (id: number) {
    this.context.todoModel.todoList = this.context.todoModel.todoList.filter((todo) => todo.id !== id);
  }
}