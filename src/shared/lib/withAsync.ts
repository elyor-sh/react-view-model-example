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

type AsyncWithState<Res> = {
  (): Promise<Res>;
  state: State
};

export function withAsync<Res>(
  fn: () => Promise<Res>
): AsyncWithState<Res> {
  const state: State = observable({
    loading: true,
    error: null,
    fulfilled: false,
  });

  async function Wrapped () {
    runInAction(() => {
      state.loading = true;
      state.error = null;
      state.fulfilled = false;
    });

    try {
      const result = await fn();
      runInAction(() => {
        state.loading = false;
        state.error = null;
        state.fulfilled = true;
      });
      return result
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

  return Wrapped;
}