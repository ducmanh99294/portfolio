import { apiDelete, apiGet, apiPut, apiPost } from "./api";

export const createOrder = (shippingAddress: Object) => {
  return apiPost("/api/orders", {
    shippingAddress
  });
};