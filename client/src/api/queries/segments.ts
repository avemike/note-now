import { API } from "..";
import { request } from "../request";

export const getSegments = (noteId: number): Promise<any> =>
  request(`${API.config.baseUrl}/segments/note/${noteId}`, {
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

export const patchSegment = ({
  pk,
  content,
}: {
  pk: number;
  content: string;
}): Promise<any> =>
  request(`${API.config.baseUrl}/segments/${pk}/`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
    headers: API.config.globalHeaders,
  });

export const deleteSegment = (pk: number): Promise<any> =>
  request(`${API.config.baseUrl}/segments/${pk}/`, {
    method: "DELETE",
    headers: API.config.globalHeaders,
  });
