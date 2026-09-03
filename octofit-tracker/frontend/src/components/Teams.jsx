import { useEffect, useState } from 'react'
import { fetchItems } from './api.js'
import DataState from './DataState.jsx'

const teamsUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams'

export default function Teams() {
  const [teams, setTeams] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('')
  useEffect(() => { fetchItems(teamsUrl).then(setTeams).catch((e) => setError(e.message)).finally(() => setLoading(false)) }, [])
  return <section className="collection-page"><div className="page-heading"><div><div className="eyebrow">COMMUNITY / 03</div><h1>Teams</h1><p className="lede">Better together, by design.</p></div><span className="count-pill">{teams.length} teams</span></div><DataState loading={loading} error={error} />{!loading && !error && <div className="card-grid">{teams.map((team, index) => <article className="team-card" key={team._id || team.id}><span className="card-index">0{index + 1}</span><h2>{team.name}</h2><p>{team.description || 'Ready to build momentum together.'}</p><footer><span>{team.memberIds?.length ?? 0} members</span><span>View team →</span></footer></article>)}{teams.length === 0 && <div className="data-state">No teams found.</div>}</div>}</section>
}