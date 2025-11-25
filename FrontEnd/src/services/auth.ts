import { api } from "./api";

export function registerUser(data: any) {
  return api("auth/register", "POST", data);
}

export function loginUser(data: any) {
  return api("auth/login", "POST", data);
}

export function getMe(token: string) {
  return api("auth/me", "GET", null, token);
}
