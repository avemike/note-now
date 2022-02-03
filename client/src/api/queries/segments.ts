import { API } from "..";
import { request } from "../request";

export const getSegments = (noteId: number): Promise<any> =>
  request(`${API.config.baseUrl}/segments/${noteId}`, {
    method: "GET",
    headers: API.config.globalHeaders,
  });

export const postSegment = ({
  content,
  order,
  note,
}: {
  content: string;
  order: number;
  note: number;
}): Promise<any> =>
  request(`${API.config.baseUrl}/segments`, {
    method: "POST",
    body: JSON.stringify({ content, order, note }),
    headers: API.config.globalHeaders,
  });
