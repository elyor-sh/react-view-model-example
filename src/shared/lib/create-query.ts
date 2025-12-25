/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  autorun,
  makeAutoObservable,
  onBecomeObserved,
  onBecomeUnobserved,
  runInAction,
} from "mobx";
import {
  QueryClient,
  QueryObserver,
  type QueryObserverOptions,
  type QueryObserverResult,
} from "@tanstack/query-core";
import type { ViewModelConstructor } from "@/shared/lib/create-use-store.ts";

export class QueryAtom<TData = unknown, TError = unknown> {
  private observer: QueryObserver<TData, TError>;
  private unsubscribe?: () => void;
  private abortController?: AbortController;

  result: QueryObserverResult<TData, TError>;

  constructor(
    client: QueryClient,
    options: QueryObserverOptions<TData, TError>,
  ) {
    this.observer = new QueryObserver(client, {
      ...options,
      queryFn: options.queryFn
        ? (ctx) => {
            // прокидываем signal
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return options.queryFn?.({
              ...ctx,
              signal: this.abortController?.signal,
            });
          }
        : undefined,
    });

    this.result = this.observer.getCurrentResult();

    makeAutoObservable(this, {}, { autoBind: true });

    onBecomeObserved(this, "result", this.subscribe);
    onBecomeUnobserved(this, "result", this.handleUnobserve);
  }

  private subscribe() {
    if (this.unsubscribe) return;
    this.abortController = new AbortController();

    this.unsubscribe = this.observer.subscribe((result) => {
      this.setResult(result);
    });
  }

  private handleUnobserve() {
    this.abort();
    this.unsubscribeObserver();
  }

  private unsubscribeObserver() {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
  }

  private abort() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = undefined;
    }
  }

  private setResult(result: QueryObserverResult<TData, TError>) {
    runInAction(() => {
      this.result = result;
    });
  }

  refetch() {
    this.abort();
    this.abortController = new AbortController();

    return this.observer.refetch();
  }

  destroy() {
    this.abort();
    this.unsubscribeObserver();
  }
}

type Options<TData, TError = unknown> = QueryObserverOptions<TData, TError> & {
  client: QueryClient;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
};

export function createQuery<
  C extends ViewModelConstructor<any>,
  TData,
  TError = unknown,
>(ctx: C, fn: () => Options<TData, TError>) {
  const { client, ...options } = fn();

  if (!ctx.disposers) {
    ctx.disposers = [];
  }

  const query = new QueryAtom<TData, TError>(client, options);
  ctx.disposers.push(query.destroy);

  const disposer = autorun(() => {
    if (query.result.isSuccess) {
      options.onSuccess?.(query.result.data);
    }
    if (query.result.isError) {
      options.onError?.(query.result.error);
    }
  });

  ctx.disposers.push(disposer);

  return query;
}
