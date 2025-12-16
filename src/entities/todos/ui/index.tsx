import {observer} from "mobx-react-lite";
import {useTodosPageStore} from "@/pages/todo/provider";
import {TodoListVM} from "@/entities/todos/view-model";
import {TodoDetails} from "@/entities/todos/ui/details";
import {Loading} from "@/shared/ui/spinner.tsx";

export const TodosList = observer(() => {
  const {vm} = useTodosPageStore(TodoListVM)

  if (vm.loadTodos.state.loading) {
    return <Loading className="size-12"/>
  }

  return (
    <ul className="mt-4 container mx-auto">
      {
        vm.context.todoModel.todoList.map((todo) => (
            <li key={todo.id} className="mb-4">
              <TodoDetails key={todo.id} todo={todo} onDelete={() => vm.deleteTodo(todo.id)} />
            </li>
        ))
      }
    </ul>
  );
})

TodosList.displayName = "TodosList";
