import { useEffect, useState } from 'react'
import { fetchItems } from './api.js'
import DataState from './DataState.jsx'

const leaderboardUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard'

export default function Leaderboard() {
  const [entries, setEntries] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('')
  useEffect(() => { fetchItems(leaderboardUrl).then(setEntries).catch((e) => setError(e.message)).finally(() => setLoading(false)) }, [])
  return <section className="collection-page"><div className="page-heading"><div><div className="eyebrow">RANKINGS / ALL TIME</div><h1>Leaderboard</h1><p className="lede">Small wins make a serious difference.</p></div><span className="count-pill">{entries.length} athletes</span></div><DataState loading={loading} error={error} />{!loading && !error && <div className="ranking-list">{entries.map((entry, index) => <article className={`rank-row rank-${index + 1}`} key={entry._id || entry.id}><span className="rank-number">{String(index + 1).padStart(2, '0')}</span><div className="avatar">{(entry.userId?.profile?.displayName || entry.userId?.username || 'A').slice(0, 1)}</div><div className="row-main"><strong>{entry.userId?.profile?.displayName || entry.userId?.username || 'Athlete'}</strong><span>{entry.teamId?.name || 'Independent'}</span></div><b className="row-metric">{entry.points ?? 0} <small>PTS</small></b></article>)}</div>}</section>
}