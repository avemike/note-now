import { API } from "..";
import { request } from "../request";

export const getNotes = (): Promise<{ data: string }> =>
  request(`${API.config.baseUrl}/notes`, {
    method: "GET",
    headers: API.config.globalHeaders,
  });

export const postNote = (name: string): Promise<{ data: string }> =>
  request(`${API.config.baseUrl}/notes`, {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: API.config.globalHeaders,
  });
