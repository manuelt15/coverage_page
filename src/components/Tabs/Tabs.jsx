import './Tabs.css'

// Filtro de categoría. El azul es la única señal de pestaña activa.
const Tabs = ({ tabs, active, counts, onSelect }) => (
  <nav className="tabs" role="tablist" aria-label="Filter by category">
    {tabs.map(tab => (
      <button
        key={tab}
        type="button"
        role="tab"
        aria-selected={active === tab}
        className={`tab ${active === tab ? 'tab--active' : ''}`}
        onClick={() => onSelect(tab)}
      >
        {tab}
        <span className="tab-count">{counts[tab]}</span>
      </button>
    ))}
  </nav>
)

export default Tabs
