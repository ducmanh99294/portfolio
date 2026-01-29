import { apiDelete, apiGet, apiPut, apiPost } from "./api";

export const postContact = (name: string, email: string, phone: string, subject: string, message: string) => {
  return apiPost("/api/contacts", {
    name,
    email,
    phone,
    subject,
    message
  });
};