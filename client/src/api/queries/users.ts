import { API } from "..";
import { request } from "../request";

export const login = (email: string, password: string): Promise<any> =>
  request(`${API.config.baseUrl}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: API.config.globalHeaders,
  });

export const register = (email: string, password: string): Promise<any> =>
  request(`${API.config.baseUrl}/register`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: API.config.globalHeaders,
  });
