import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          <span className="brand-mark">OF</span>
          <span>OctoFit <small>TRACKER</small></span>
        </NavLink>
        <Navigation />
        <div className="profile-chip"><span className="status-dot" /> Live workspace</div>
      </header>
      <main className="content-wrap">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Navigation() {
  const links = [['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'], ['/teams', 'Teams'], ['/users', 'People'], ['/workouts', 'Workouts']]
  return <nav className="main-nav" aria-label="Primary navigation">{links.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}</nav>
}

function Dashboard() {
  const location = useLocation()
  return <section className="dashboard-page">
    <div className="eyebrow">Thursday · September 03, 2026 <span>●</span> Week 36</div>
    <div className="welcome-row"><div><h1>Make today count.</h1><p className="lede">A clear view of your team&apos;s momentum, one session at a time.</p></div><NavLink className="button-primary" to="/activities">Log activity <span>↗</span></NavLink></div>
    <div className="dashboard-grid">
      <NavLink className="feature-panel coral-panel" to="/leaderboard"><span className="panel-label">COMPETITION</span><strong>See who&apos;s<br />leading the pack.</strong><span className="panel-link">Open leaderboard ↗</span></NavLink>
      <NavLink className="feature-panel ink-panel" to="/workouts"><span className="panel-label">YOUR NEXT MOVE</span><strong>Find a workout<br />that fits today.</strong><span className="panel-link">Browse workouts ↗</span></NavLink>
    </div>
    <div className="quick-links"><span>EXPLORE YOUR DATA</span><NavLink to="/users">People <b>→</b></NavLink><NavLink to="/teams">Teams <b>→</b></NavLink><NavLink to="/activities">Recent activity <b>→</b></NavLink></div>
    <p className="route-note">Current view: {location.pathname === '/' ? 'overview' : location.pathname}</p>
  </section>
}

export default App
