import type {Location, NavigateFunction, RouterState} from "react-router";
import {makeAutoObservable} from "mobx";
import {isEqual} from "lodash-es";
import {parseQueryParams} from "@/shared/lib/query-params.ts";

export class AppRouter {
  params: Record<string, string | undefined>

  constructor(public location: Location, matches: RouterState['matches'], public navigate: NavigateFunction) {
    this.params = matches[matches.length - 1].params;
    makeAutoObservable(this, {navigate: false}, {autoBind: true});
  }

  subscribe (state: RouterState) {
    const location = {...state.location, key: this.location.key}
    if(!isEqual(this.location, location)) {
      this.location = state.location;
    }
    const params = state.matches[state.matches.length - 1].params
    if(!isEqual(this.params, params)) {
      this.params = params
    }
  }

  get queryParams () {
    return parseQueryParams(this.location.search);
  }
}