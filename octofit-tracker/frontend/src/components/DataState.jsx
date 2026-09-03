export default function DataState({ loading, error }) {
  if (loading) return <div className="data-state">Loading data...</div>
  if (error) return <div className="data-state error-state">{error}</div>
  return null
}