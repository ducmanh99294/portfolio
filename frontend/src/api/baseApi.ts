const API_URL = "http://localhost:3000" ;
// https://portfolio-1-wos1.onrender.com
// const API_URL = process.env.VITE_API_URL as string ;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function request<T = any>(
  method: HttpMethod,
  endpoint: string,
  data?: unknown,
  customHeaders: HeadersInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
    credentials: "include",
    body: data ? JSON.stringify(data) : undefined,
  });

  if (res.status === 401) { 
    throw new Error("UNAUTHORIZED");
    // return res.json();
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Request failed");
  }

  return res.json();
}
