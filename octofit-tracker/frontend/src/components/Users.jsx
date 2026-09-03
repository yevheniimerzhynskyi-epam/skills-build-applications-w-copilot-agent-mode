import { useEffect, useState } from 'react'
import { fetchItems } from './api.js'
import DataState from './DataState.jsx'

const usersUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users'

export default function Users() {
  const [users, setUsers] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('')
  useEffect(() => { fetchItems(usersUrl).then(setUsers).catch((e) => setError(e.message)).finally(() => setLoading(false)) }, [])
  return <section className="collection-page"><div className="page-heading"><div><div className="eyebrow">THE PEOPLE / 04</div><h1>People</h1><p className="lede">Meet the people behind the progress.</p></div><span className="count-pill">{users.length} members</span></div><DataState loading={loading} error={error} />{!loading && !error && <div className="table-list">{users.map((user) => <article className="list-row" key={user._id || user.id}><div className="avatar">{(user.profile?.displayName || user.username || 'A').slice(0, 1)}</div><div className="row-main"><strong>{user.profile?.displayName || user.username}</strong><span>@{user.username} · {user.email}</span></div><span className="team-tag">{user.teamId ? 'Team member' : 'Independent'}</span></article>)}</div>}</section>
}