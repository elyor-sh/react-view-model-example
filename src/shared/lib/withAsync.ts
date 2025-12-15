import {observable, runInAction} from "mobx";

type AsyncWithLoading<Res> = {
  (): Promise<Res>;
  state: {
    loading: boolean;
  };
};

export function withAsync<Res>(
  fn: () => Promise<Res>
): AsyncWithLoading<Res> {
  const state = observable({
    loading: false
  });

  async function Wrapped () {
    runInAction(() => {
      state.loading = true;
    });

    try {
      return await fn();
    } finally {
      runInAction(() => {
        state.loading = false;
      });
    }
  }

  Wrapped.state = state;

  return Wrapped;
}