import { useDatasources } from './hooks/useDatasources'
import Coverage from './pages/Coverage'
import './App.css'

const App = () => {
  const { data } = useDatasources()

  const working = data.filter(d => d.status === 'Working').length
  const categories = new Set(data.map(d => d.category)).size

  return (
    <div className="app">
      <header className="nav-bar">
        <span className="nav-mark">
          <img src="/favicon.svg" alt="" width="20" height="20" />
          Coverage
        </span>
        <span className="nav-meta">{data.length} platforms</span>
      </header>

      {/* Único momento oscuro de la página: el sistema reserva la banda índigo para el hero. */}
      <section className="hero-band">
        <div className="hero-inner">
          <p className="badge-pill">Data sources</p>
          <h1 className="hero-title">Every platform we read from</h1>
          <p className="hero-sub">
            What we can pull today across gig economy, payments, payroll and tax, and what is on the way.
          </p>
          <dl className="hero-stats">
            <div>
              <dt>Platforms</dt>
              <dd>{data.length}</dd>
            </div>
            <div>
              <dt>Working</dt>
              <dd>{working}</dd>
            </div>
            <div>
              <dt>Categories</dt>
              <dd>{categories}</dd>
            </div>
          </dl>
        </div>
      </section>

      <Coverage />
    </div>
  )
}

export default App
