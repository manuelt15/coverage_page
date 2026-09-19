import { useDatasources } from './hooks/useDatasources'
import Coverage from './pages/Coverage'
import './App.css'

const App = () => {
  const { data } = useDatasources()

  const working = data.filter(d => d.status === 'Working').length
  const coming = data.length - working
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
          <p className="badge-pill">Live coverage</p>
          <h1 className="hero-title">Check it here before you build against it</h1>
          <p className="hero-sub">
            Every data source we connect to, and the honest state of each one. No guessing, no
            support ticket.
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
              <dt>Coming soon</dt>
              <dd>{coming}</dd>
            </div>
            <div>
              <dt>Categories</dt>
              <dd>{categories}</dd>
            </div>
          </dl>

          {/* La cabecera promete cobertura en vivo: el aviso va aquí, junto a la promesa. */}
          <p className="hero-note">
            Demo project. The platforms below are sample data, not a real coverage list.
          </p>
        </div>
      </section>

      <Coverage />
    </div>
  )
}

export default App
