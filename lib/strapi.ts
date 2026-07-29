const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

interface StrapiResponse<T> {
  data: T
  meta?: Record<string, unknown>
}

/**
 * Fetch from Strapi's REST API (server-side only).
 * Uses the API token for authenticated requests.
 */
export async function strapiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<StrapiResponse<T>> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
  }

  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    ...options,
    headers: { ...headers, ...options?.headers },
  })

  if (!res.ok) {
    throw new Error(`Strapi error ${res.status}: ${res.statusText}`)
  }

  return res.json()
}

/**
 * POST to Strapi's REST API (server-side only).
 */
export async function strapiPost<T>(
  path: string,
  body: Record<string, unknown>
): Promise<StrapiResponse<T>> {
  return strapiFetch<T>(path, {
    method: 'POST',
    body: JSON.stringify({ data: body }),
  })
}
