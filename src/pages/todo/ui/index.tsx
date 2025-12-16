import {observer} from "mobx-react-lite";
import {TodosPageContext, TodosPageModel} from "@/pages/todo/provider";
import {TodosList} from "@/entities/todos/ui";

const TodosPageContent = observer(() => {
  return (
    <div className="container mx-auto">
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
