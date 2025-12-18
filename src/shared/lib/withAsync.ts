/* eslint-disable @typescript-eslint/no-explicit-any */
import { observable, runInAction } from "mobx";

type State =
  | {
      loading: true;
      error: null;
      fulfilled: false;
    }
  | {
      loading: false;
      error: null;
      fulfilled: true;
    }
  | {
      loading: false;
      error: NonNullable<unknown>;
      fulfilled: false;
    };

type AsyncWithState<Req, Res> = Req extends void
  ? {
      (): Promise<Res>;
      state: State;
      abortController?: AbortController;
    }
  : {
      (params: Req): Promise<Res>;
      state: State;
      abortController?: AbortController;
    };

export type ParamsWithSignal<Req> = { signal: AbortSignal } & Req;

export function withAsync<Res>(
  fn: ({ signal }: { signal: AbortSignal }) => Promise<Res>,
): AsyncWithState<void, Res>;

export function withAsync<Req extends object, Res>(
  fn: ({ signal, ...params }: { signal: AbortSignal } & Req) => Promise<Res>,
): AsyncWithState<Req, Res>;

// реализация
export function withAsync<Req extends object | void = void, Res = unknown>(
  fn: (
    args: { signal: AbortSignal } & (Req extends void ? object : Req),
  ) => Promise<Res>,
): AsyncWithState<Req, Res> {
  let currentController: AbortController | null = null;

  const state: any = observable({
    loading: false,
    error: null,
    fulfilled: false,
  });

  const Wrapped = (async (params?: Req) => {
    currentController?.abort();

    const controller = new AbortController();
    currentController = controller;
    Wrapped.abortController = controller;

    runInAction(() => {
      state.loading = true;
      state.error = null;
      state.fulfilled = false;
    });

    try {
      const result = await fn({
        signal: controller.signal,
        ...(params ?? {}),
      } as any);

      if (currentController === controller) {
        runInAction(() => {
          state.loading = false;
          state.error = null;
          state.fulfilled = true;
        });
      }

      return result;
    } catch (error) {
      if (!controller.signal.aborted && currentController === controller) {
        runInAction(() => {
          state.loading = false;
          state.error = error as NonNullable<unknown>;
          state.fulfilled = false;
        });
      }
      throw error;
    }
  }) as AsyncWithState<Req, Res>;

  Wrapped.state = state as State;
  Wrapped.abortController = undefined;

  return Wrapped;
}
