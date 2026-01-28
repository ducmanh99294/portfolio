import { apiGet, apiPost } from "./api";

export const getProduct = async () => {
  try {
    return await apiGet("/api/products");
  } catch {
    return null;
  }
};

export const getProductById = async (id: string) => {
  try {
    return await apiGet(`/api/products/${id}`);
  } catch {
    return null;
  }
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
