import './Tabs.css'

const Tabs = ({ tabs, active, counts, onSelect }) => (
  <nav className="tabs" role="tablist">
    {tabs.map(tab => (
      <button
        key={tab}
        role="tab"
        aria-selected={active === tab}
        className={`tab ${active === tab ? 'tab--active' : ''}`}
        onClick={() => onSelect(tab)}
      >
        {tab} <span className="tab-count">{counts[tab]}</span>
      </button>
    ))}
  </nav>
)

export default Tabs
