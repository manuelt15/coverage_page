import './StatusChips.css'

const STATUSES = [['Working', 'working'], ['Coming soon', 'soon']]

const StatusChips = ({ active, onToggle }) => (
  <div className="chips" role="group" aria-label="Filter by status">
    {STATUSES.map(([status, key]) => (
      <button
        key={status}
        type="button"
        className={`chip ${active.includes(status) ? 'chip--active' : ''}`}
        onClick={() => onToggle(status)}
        aria-pressed={active.includes(status)}
      >
        <span className={`chip-dot chip-dot--${key}`} />
        {status}
      </button>
    ))}
  </div>
)

export default StatusChips
