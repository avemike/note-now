import { API } from "..";
import { request } from "../request";

export const getNotes = (): Promise<any> =>
  request(`${API.config.baseUrl}/notes`, {
    method: "GET",
    headers: API.config.globalHeaders,
  });
