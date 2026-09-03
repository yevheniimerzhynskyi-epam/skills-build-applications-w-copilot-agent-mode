import { useEffect, useState } from 'react'
import { fetchItems, formatDate } from './api.js'
import DataState from './DataState.jsx'

const activitiesUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => { fetchItems(activitiesUrl).then(setActivities).catch((e) => setError(e.message)).finally(() => setLoading(false)) }, [])
  return <CollectionPage title="Activity log" kicker="MOVEMENT / 01" intro="Every session adds up." count={`${activities.length} sessions`}><DataState loading={loading} error={error} />{!loading && !error && <div className="table-list">{activities.map((activity) => <article className="list-row" key={activity._id || activity.id}><div className="row-icon">{activity.type?.slice(0, 1).toUpperCase()}</div><div className="row-main"><strong>{activity.type || 'Activity'}</strong><span>{activity.notes || 'Training session'} · {formatDate(activity.date)}</span></div><b className="row-metric">{activity.points ?? 0} <small>PTS</small></b><span className="row-duration">{activity.durationMinutes ?? 0} min</span></article>)}{activities.length === 0 && <div className="data-state">No activities recorded.</div>}</div>}</CollectionPage>
}

function CollectionPage({ title, kicker, intro, count, children }) { return <section className="collection-page"><div className="page-heading"><div><div className="eyebrow">{kicker}</div><h1>{title}</h1><p className="lede">{intro}</p></div><span className="count-pill">{count}</span></div>{children}</section> }