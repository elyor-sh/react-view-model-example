import { observer } from "mobx-react-lite";
import {
  TodosPageContext,
  TodosPageModel,
  useTodosPageStore,
} from "@/pages/todo/provider";
import { TodosList } from "@/entities/todos/ui";
import { useGlobalStore } from "@/app/globals.ts";
import { TodoListVM } from "@/entities/todos/view-model";
import { Loading } from "@/shared/ui/spinner.tsx";
import { TodosFilter } from "@/features/todos/ui/filter";

const TodosPageContent = observer(() => {
  const { context } = useGlobalStore();
  const { vm } = useTodosPageStore(TodoListVM, { router: context.router });

  return (
    <>
      <Loading className="size-12" show={vm.loadTodos.state.loading} />
      <div className="container mx-auto">
        <h3 className="mb-2">Todos ({vm.context.todoModel.todoList.length})</h3>
        <div className="my-2">
          <TodosFilter />
        </div>
        <TodosList vm={vm} />
      </div>
    </>
  );
});

TodosPageContent.displayName = "TodosPageContent";

export const TodosPage = () => {
  return (
    <TodosPageContext value={new TodosPageModel()}>
      <TodosPageContent />
    </TodosPageContext>
  );
};
