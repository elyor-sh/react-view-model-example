import { DropdownMenuItem } from "@/shared/ui/dropdown-menu.tsx";
import { observer } from "mobx-react-lite";
import { useGlobalStore } from "@/app/globals.ts";
import { LogoutVM } from "@/features/logout/view-model";
import { useNavigate } from "react-router";

export const Logout = observer(() => {
  const navigate = useNavigate();
  const { vm } = useGlobalStore(LogoutVM, { navigate });

  return (
    <DropdownMenuItem onClick={vm.logout}>
      <span>Logout</span>
    </DropdownMenuItem>
  );
});

Logout.displayName = "Logout";
