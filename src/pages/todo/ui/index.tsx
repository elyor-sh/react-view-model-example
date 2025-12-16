import {observer} from "mobx-react-lite";
import {TodosPageContext, TodosPageModel} from "@/pages/todo/provider";
import {TodosList} from "@/entities/todos/ui";

const TodosPageContent = observer(() => {
  return (
    <div className="container mx-auto">
      <h3 className="mb-2">Todos</h3>
      <TodosList />
    </div>
  )
})

TodosPageContent.displayName = "TodosPageContent";

export const TodosPage = () => {
  return (
    <TodosPageContext value={new TodosPageModel()}>
      <TodosPageContent />
    </TodosPageContext>
  )
}
