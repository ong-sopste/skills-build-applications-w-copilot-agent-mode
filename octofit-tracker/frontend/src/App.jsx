import { useEffect, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { apiBaseUrl, apiUrl } from './api'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navigation = [
  { label: 'Overview', path: '/', title: 'Your space' },
  { label: 'Activities', path: '/activities', title: 'Activities' },
  { label: 'Teams', path: '/teams', title: 'Teams' },
  { label: 'Users', path: '/users', title: 'Users' },
  { label: 'Leaderboard', path: '/leaderboard', title: 'Leaderboard' },
  { label: 'Workouts', path: '/workouts', title: 'Workouts' },
]

function Overview() {
  return (
    <>
      <section className="welcome-panel">
        <div className="welcome-copy">
          <p className="eyebrow">OCTOFIT TRACKER</p>
          <h2>Track training, teams, and progress from one place.</h2>
          <p>Live data comes from the Node API at {apiBaseUrl}.</p>
          <NavLink className="btn btn-dark welcome-action" to="/activities">
            View activities
          </NavLink>
        </div>
        <div className="welcome-mark" aria-hidden="true">
          <img src="/octofitapp-small.png" alt="" />
        </div>
        <div className="welcome-caption">MULTI-TIER FITNESS TRACKING</div>
      </section>

      <section className="weekly-section" aria-labelledby="quick-links-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">API RESOURCES</p>
            <h2 id="quick-links-heading">Quick access</h2>
          </div>
          <span className="week-label">React 19 + Vite</span>
        </div>
        <div className="metrics-row">
          <NavLink className="metric-block metric-link" to="/users">
            <span className="metric-value">Users</span>
            <span className="metric-label">/api/users/</span>
          </NavLink>
          <NavLink className="metric-block metric-block-accent metric-link" to="/leaderboard">
            <span className="metric-value">Ranks</span>
            <span className="metric-label">/api/leaderboard/</span>
          </NavLink>
          <NavLink className="metric-block metric-link" to="/workouts">
            <span className="metric-value">Plans</span>
            <span className="metric-label">/api/workouts/</span>
          </NavLink>
        </div>
      </section>

      <section className="start-note" aria-label="API configuration">
        <span className="start-indicator" />
        <p>Codespaces uses VITE_CODESPACE_NAME; localhost is used when it is unset.</p>
        <NavLink to="/teams" aria-label="Open teams">-&gt;</NavLink>
      </section>
    </>
  )
}

function App() {
  const [apiStatus, setApiStatus] = useState('checking')
  const location = useLocation()
  const currentPage = navigation.find((item) => item.path === location.pathname)

  useEffect(() => {
    const controller = new AbortController()

    fetch(apiUrl('/api/health'), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('API unavailable')
        setApiStatus('online')
      })
      .catch(() => {
        if (!controller.signal.aborted) setApiStatus('offline')
      })

    return () => controller.abort()
  }, [])

  return (
    <div className="tracker-shell">
      <header className="topbar">
        <NavLink className="brand-lockup" to="/" aria-label="OctoFit home">
          <img src="/octofitapp-small.png" alt="" />
          <span>octofit<span className="brand-light">tracker</span></span>
        </NavLink>
        <div className={`connection-state connection-${apiStatus}`}>
          <span className="connection-dot" />
          <span>{apiStatus === 'online' ? 'API online' : apiStatus === 'checking' ? 'Checking API...' : 'API offline'}</span>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar" aria-label="Primary navigation">
          <p className="sidebar-label">OCTOFIT DATA</p>
          <nav className="nav flex-column">
            {navigation.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                <span className="nav-index">0{index + 1}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-foot">
            <span className="sidebar-rule" />
            <span>PORT 5173 TO PORT 8000</span>
          </div>
        </aside>

        <main className="main-content">
          <div className="page-heading">
            <div>
              <p className="eyebrow">PRESENTATION <span>/</span> LOGIC <span>/</span> DATA</p>
              <h1>{currentPage?.title ?? 'Your space'}</h1>
            </div>
            <span className="today-label">{apiBaseUrl}</span>
          </div>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Overview />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App