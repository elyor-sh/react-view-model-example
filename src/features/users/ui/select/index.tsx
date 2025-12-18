import { observer } from "mobx-react-lite";
import { useGlobalStore } from "@/app/globals";
import { UserSelectVM } from "@/features/users/view-model/select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  type SelectProps,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export const UserSelect = observer((props: SelectProps) => {
  const { vm } = useGlobalStore(UserSelectVM);

  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Выберите пользователя" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Пользователи</SelectLabel>
          {vm.users.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

UserSelect.displayName = "UserSelect";
