import { observer } from "mobx-react-lite";
import { TodoListVM } from "@/entities/todos/view-model";
import { TodoDetails } from "@/entities/todos/ui/details";

type Props = {
  vm: TodoListVM;
};

export const TodosList = observer(({ vm }: Props) => {
  return (
    <ul className="mt-4 container mx-auto">
      {vm.context.todoModel.todoList.map((todo) => (
        <li key={todo.id} className="mb-4">
          <TodoDetails
            key={todo.id}
            todo={todo}
            onDelete={() => vm.deleteTodo({ id: todo.id })}
          />
        </li>
      ))}
    </ul>
  );
});

TodosList.displayName = "TodosList";
