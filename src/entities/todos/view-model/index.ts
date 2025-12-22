import {
  appendAutoRun,
  type ViewModelConstructor,
} from "@/shared/lib/create-use-store.ts";
import type { TodosPageContextType } from "@/pages/todo/provider";
import { type ParamsWithSignal, withAsync } from "@/shared/lib/withAsync.ts";
import { http } from "@/shared/http";
import { todoListQueryParamsSchema } from "@/entities/todos/api";
import type { AppRouter } from "@/provider/router-provider/model";
import { parseError } from "@/shared/lib/parseError";
import type { Todo } from "@/entities/todos/model";
import { makeViewModel } from "@/shared/lib/make-view-model.ts";

type ViewModel = ViewModelConstructor<TodosPageContextType>;

type Props = {
  router: AppRouter;
};

export class TodoListVM implements ViewModel {
  constructor(
    public context: TodosPageContextType,
    public props: Props,
  ) {
    makeViewModel(this);

    appendAutoRun(this, () => {
      void this.loadTodos();
    });
  }

  loadTodos = withAsync(async ({ signal }) => {
    try {
      const params = todoListQueryParamsSchema.parse(
        this.props.router.queryParams,
      );
      const res = await http.get<Todo[]>("/todos", { params, signal });
      this.setTodos(res.data);
    } catch (error) {
      parseError(error);
    }
  });

  deleteTodo = withAsync(
    async ({ signal, id }: ParamsWithSignal<{ id: number }>) => {
      try {
        await http.delete(`/todos/${id}`, { signal });
        this.setTodos(
          this.context.todoModel.todoList.filter((todo) => todo.id !== id),
        );
      } catch (error) {
        parseError(error);
      }
    },
  );

  beforeUnmount() {
    this.loadTodos.abortController?.abort();
    this.deleteTodo.abortController?.abort();
  }

  setTodos(todos: Todo[]) {
    this.context.todoModel.todoList = todos;
  }
}
