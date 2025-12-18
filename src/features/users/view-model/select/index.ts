import type { ViewModelConstructor } from "@/shared/lib/create-use-store.ts";
import type { GlobalContextType } from "@/app/globals.ts";
import { withAsync } from "@/shared/lib/withAsync.ts";
import { http } from "@/shared/http";
import type { UsersListModel } from "@/entities/users/api";
import { makeAutoObservable } from "mobx";

type ViewModel = ViewModelConstructor<GlobalContextType>;

type UserSelect = {
  id: number;
  name: string;
};

export class UserSelectVM implements ViewModel {
  users: UserSelect[] = [];

  constructor(public context: GlobalContextType) {
    makeAutoObservable(this, { loadUsers: false }, { autoBind: true });
  }

  loadUsers = withAsync(async ({ signal }) => {
    const res = await http.get<UsersListModel[]>("/users", { signal });
    this.mapUsers(res.data);
  });

  mapUsers(users: UsersListModel[]) {
    this.users = users.map((user) => ({
      id: user.id,
      name: user.name,
    }));
  }

  beforeMount() {
    void this.loadUsers();
  }
}
