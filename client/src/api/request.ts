import { API } from ".";

export const request = async <ResponseData>(
  input: string,
  init?: RequestInit
): Promise<ResponseData> => {
  const res = await API.fetch(input, init);
  if (!res.ok) {
    throw res;
  }
  return res.json();
};
