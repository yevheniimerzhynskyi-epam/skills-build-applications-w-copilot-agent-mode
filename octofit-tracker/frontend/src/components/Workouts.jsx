import { useEffect, useState } from 'react'
import { fetchItems } from './api.js'
import DataState from './DataState.jsx'

const workoutsUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('')
  useEffect(() => { fetchItems(workoutsUrl).then(setWorkouts).catch((e) => setError(e.message)).finally(() => setLoading(false)) }, [])
  return <section className="collection-page"><div className="page-heading"><div><div className="eyebrow">TRAINING LIBRARY / 05</div><h1>Workouts</h1><p className="lede">The right challenge for right now.</p></div><span className="count-pill">{workouts.length} plans</span></div><DataState loading={loading} error={error} />{!loading && !error && <div className="card-grid workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id || workout.id}><div className="workout-meta"><span>{workout.activityType}</span><span>{workout.durationMinutes} MIN</span></div><h2>{workout.title}</h2><p>{workout.description}</p><footer><span className={`difficulty ${workout.difficulty}`}>{workout.difficulty}</span><span>Start plan →</span></footer></article>)}</div>}</section>
}