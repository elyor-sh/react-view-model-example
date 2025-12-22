import type { ViewModelConstructor } from "@/shared/lib/create-use-store.ts";
import type { GlobalContextType } from "@/app/globals.ts";
import { type TodoListQueryParams } from "@/entities/todos/api";
import { debounce } from "lodash-es";
import type { ChangeEvent } from "react";
import { makeViewModel } from "@/shared/lib/make-view-model.ts";

type ViewModel = ViewModelConstructor<GlobalContextType>;

export class TodoListFilterVM implements ViewModel {
  constructor(public context: GlobalContextType) {
    makeViewModel(this);
  }

  get queryParams() {
    return this.context.router.queryParams as TodoListQueryParams;
  }

  setQueryParams(params: Partial<TodoListQueryParams>) {
    this.context.router.setQueryParams(params);
  }

  search = debounce((e: ChangeEvent<HTMLInputElement>) => {
    this.context.router.setQueryParams({ search: e.target.value });
  }, 300);
}
