import { useEffect, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

const navigation = [
  { label: 'Vue d’ensemble', path: '/', title: 'Votre espace' },
  { label: 'Activités', path: '/activities', title: 'Activités' },
  { label: 'Équipes', path: '/teams', title: 'Équipes' },
  { label: 'Classement', path: '/leaderboard', title: 'Classement' },
  { label: 'Entraînements', path: '/workouts', title: 'Entraînements' },
]

type ApiStatus = 'checking' | 'online' | 'offline'

function Overview() {
  return (
    <>
      <section className="welcome-panel">
        <div className="welcome-copy">
          <p className="eyebrow">VOTRE PROCHAINE ÉTAPE COMMENCE ICI</p>
          <h2>Le progrès prend son élan ici.</h2>
          <p>Chaque mouvement compte. À vous de choisir le rythme.</p>
          <NavLink className="btn btn-dark welcome-action" to="/activities">
            Explorer les activités
          </NavLink>
        </div>
        <div className="welcome-mark" aria-hidden="true">
          <img src="/octofitapp-small.png" alt="" />
        </div>
        <div className="welcome-caption">EN MOUVEMENT, ENSEMBLE</div>
      </section>

      <section className="weekly-section" aria-labelledby="weekly-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">VOTRE ACTIVITÉ</p>
            <h2 id="weekly-heading">Cette semaine</h2>
          </div>
          <span className="week-label">Semaine en cours</span>
        </div>
        <div className="metrics-row">
          <article className="metric-block">
            <span className="metric-value">0</span>
            <span className="metric-label">activités</span>
          </article>
          <article className="metric-block metric-block-accent">
            <span className="metric-value">0<span className="metric-unit"> min</span></span>
            <span className="metric-label">en mouvement</span>
          </article>
          <article className="metric-block">
            <span className="metric-value">0<span className="metric-unit"> km</span></span>
            <span className="metric-label">parcourus</span>
          </article>
        </div>
      </section>

      <section className="start-note" aria-label="État du suivi">
        <span className="start-indicator" />
        <p>Votre suivi est prêt. Votre première activité donnera le ton.</p>
        <NavLink to="/activities" aria-label="Ouvrir les activités">→</NavLink>
      </section>
    </>
  )
}

function EmptySection({ title }: { title: string }) {
  return (
    <section className="empty-section">
      <span className="empty-index">00</span>
      <div>
        <p className="eyebrow">OCTOFIT TRACKER</p>
        <h2>{title}</h2>
        <p>Rien à afficher pour le moment.</p>
      </div>
    </section>
  )
}

function App() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>('checking')
  const location = useLocation()
  const currentPage = navigation.find((item) => item.path === location.pathname)

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/health', { signal: controller.signal })
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
        <NavLink className="brand-lockup" to="/" aria-label="OctoFit, accueil">
          <img src="/octofitapp-small.png" alt="" />
          <span>octofit<span className="brand-light">tracker</span></span>
        </NavLink>
        <div className={`connection-state connection-${apiStatus}`}>
          <span className="connection-dot" />
          <span>{apiStatus === 'online' ? 'API connectée' : apiStatus === 'checking' ? 'Connexion...' : 'API hors ligne'}</span>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar" aria-label="Navigation principale">
          <p className="sidebar-label">ESPACE PERSONNEL</p>
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
            <span>MOVE WITH INTENTION</span>
          </div>
        </aside>

        <main className="main-content">
          <div className="page-heading">
            <div>
              <p className="eyebrow">OCTOFIT <span>/</span> SUIVI PERSONNEL</p>
              <h1>{currentPage?.title ?? 'Votre espace'}</h1>
            </div>
            <span className="today-label">MOUVEMENT · PROGRÈS · ÉQUILIBRE</span>
          </div>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/activities" element={<EmptySection title="Vos activités" />} />
            <Route path="/teams" element={<EmptySection title="Vos équipes" />} />
            <Route path="/leaderboard" element={<EmptySection title="Le classement" />} />
            <Route path="/workouts" element={<EmptySection title="Vos entraînements" />} />
            <Route path="*" element={<EmptySection title="Votre espace" />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
