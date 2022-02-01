import * as queries from "./queries";

export const API = {
  ...queries,
  config: {
    baseUrl: process.env.REACT_APP_API_URL || "/api",
    globalHeaders: {
      accept: "*/*",
      "Content-Type": "application/json",
    } as Record<string, string>,
  },
  fetch: window.fetch,
};
