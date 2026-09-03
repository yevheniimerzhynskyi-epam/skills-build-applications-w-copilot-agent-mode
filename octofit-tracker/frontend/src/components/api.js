export const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchItems(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  return payload.results || payload.data || payload.items || []
}

export function useCollectionState(setState, setError, setLoading, url) {
  return fetchItems(url)
    .then((items) => setState(items))
    .catch((error) => setError(error.message))
    .finally(() => setLoading(false))
}

export function formatDate(value) {
  return value ? new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '—'
}