import { observer } from "mobx-react-lite";
import { useGlobalStore } from "@/app/globals.ts";
import { Input } from "@/shared/ui";
import { TodoListFilterVM } from "@/features/todos/view-model/filter";

export const TodosFilter = observer(() => {
  const { vm } = useGlobalStore(TodoListFilterVM);

  return (
    <>
      <Input
        placeholder="Search"
        defaultValue={vm.queryParams.search}
        onChange={vm.search}
      />
    </>
  );
});
