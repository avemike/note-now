import { API } from "..";
import { request } from "../request";

export const getSegments = (noteId: number): Promise<any> =>
  request(`${API.config.baseUrl}/segments/${noteId}`, {
    method: "GET",
    headers: API.config.globalHeaders,
  });
