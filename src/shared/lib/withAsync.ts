import {observable, runInAction} from "mobx";

type State = |
  {
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
  }

type AsyncWithState<Req, Res> =
  Req extends void
    ? {
      (): Promise<Res>;
      state: State;
      abortController: AbortController
    }
    : {
      (params: Req): Promise<Res>;
      state: State;
      abortController: AbortController
    };

export function withAsync<Res>(
  fn: () => Promise<Res>
): AsyncWithState<void, Res>;

export function withAsync<Req, Res>(
  fn: (params: Req) => Promise<Res>
): AsyncWithState<Req, Res>;

// реализация
export function withAsync(fn: (req?: unknown) => Promise<unknown>) {
  const abortController = new AbortController();
  const state: State = observable({
    loading: true,
    error: null,
    fulfilled: false,
  });

  async function Wrapped(req?: unknown) {
    runInAction(() => {
      state.loading = true;
      state.error = null;
      state.fulfilled = false;
    });

    try {
      const result = await fn(req);
      runInAction(() => {
        state.loading = false;
        state.error = null;
        state.fulfilled = true;
      });
      return result;
    } catch (error) {
      runInAction(() => {
        state.loading = false;
        state.error = error as NonNullable<unknown>;
        state.fulfilled = false;
      });
      throw error;
    }
  }

  Wrapped.state = state;
  Wrapped.abortController = abortController;

  return Wrapped;
}
