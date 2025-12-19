import type { Location, NavigateFunction, RouterState } from "react-router";
import { makeAutoObservable } from "mobx";
import { isEqual } from "lodash-es";
import {
  parseQueryParams,
  stringifyQueryParams,
} from "@/shared/lib/query-params.ts";
import type { FiltersModel } from "@/provider/filters-provider/model";

export class AppRouter {
  params: Record<string, string | undefined>;

  constructor(
    public location: Location,
    matches: RouterState["matches"],
    public navigate: NavigateFunction,
    public filtersModel: FiltersModel,
  ) {
    this.params = matches[matches.length - 1].params;
    makeAutoObservable(this, { navigate: false }, { autoBind: true });
  }

  get queryParams() {
    return parseQueryParams(this.location.search);
  }

  subscribe(state: RouterState) {
    const location = { ...state.location, key: this.location.key };
    if (!isEqual(this.location, location)) {
      this.location = state.location;
    }
    const params = state.matches[state.matches.length - 1].params;
    if (!isEqual(this.params, params)) {
      this.params = params;
    }
  }

  setQueryParams(params: Record<string, unknown>) {
    const search = stringifyQueryParams({ ...this.queryParams, ...params });
    this.filtersModel.filters[this.location.pathname] = search;
    this.navigate(`?${search}`);
  }
}
