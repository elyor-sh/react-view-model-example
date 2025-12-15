const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// mock http client
export const http = {
  get: async <Res,>(_: string, res: Res) => {
    await sleep(1000);
    return res;
  },
  post: async <Res,>(_: string, res: Res) => {
    await sleep(1000);
    return res;
  },
  put: async <Res,>(_: string, res: Res) => {
    await sleep(1000);
    return res;
  },
  delete: async <Res,>(_: string, res: Res) => {
    await sleep(1000);
    return res;
  },
};
