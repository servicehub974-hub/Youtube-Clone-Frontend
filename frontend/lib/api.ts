export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type FetchOptions = RequestInit & { json?: unknown };

/**
 * Thin fetch wrapper around the backend API.
 * `credentials: include` so the httpOnly refresh cookie flows (added in Phase 1 auth).
 */
export async function api<T>(path: string, opts: FetchOptions = {}): Promise<T> {
  const { json, headers, ...rest } = opts;
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(json !== undefined ? { body: JSON.stringify(json) } : {}),
    ...rest,
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body?.detail ?? detail;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(`${res.status}: ${detail}`);
  }

  return res.json() as Promise<T>;
}

export const apiGet = <T>(path: string) => api<T>(path, { method: "GET" });
