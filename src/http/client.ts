import "server-only";
import { ConflictError, NetworkError, NotFoundError, ProxyError, ServerError } from "@/http/errors";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  cache?: RequestCache;
  next?: NextFetchRequestConfig
}

export async function request<T>(
  endpoint: `/${string}`,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", headers = {}, body, cache = "no-cache" } = options;
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  try {
    const response = await fetch(`${process.env.APP_BACKEND_HOST}${endpoint}`, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
      cache
    });

    if (response.status === 404) {
      throw new NotFoundError();
    }

    if (response.status === 409) {
      throw new ConflictError();
    }

    if (response.status >= 500) {
      throw new ServerError(response.status);
    }

    if (!response.ok) {
      throw new ServerError(response.status, `HTTP ${response.status}`);
    }

    const text = await response.text();
    if (!text) {
      return {} as T;
    }

    return JSON.parse(text) as T;
  } catch (error) {
    if (error instanceof ProxyError) {
      throw error;
    }
    throw new NetworkError();
  }
}
