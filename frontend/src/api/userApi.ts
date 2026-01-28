import { apiGet, apiPost } from "./api";

export const getMe = async () => {
    return await apiGet("/api/auth/me");
};

export const register = async (email: string, password: string) => {
  try {
    return await apiPost("/api/auth/register", {
      email,
      password
    });
  } catch {
    return null;
  }
};

export const login = async (email: string, password: string) => {
  try {
    return await apiPost("/api/auth/login", {
      email,
      password
    });
  } catch {
    return null;
  }
};
