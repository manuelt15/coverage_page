import './StatusChips.css'

const STATUSES = ['Working', 'Coming soon']

const StatusChips = ({ active, onToggle }) => (
  <div className="chips" role="group" aria-label="Filter by status">
    {STATUSES.map(s => (
      <button
        key={s}
        className={`chip ${active.includes(s) ? 'chip--active' : ''}`}
        onClick={() => onToggle(s)}
        aria-pressed={active.includes(s)}
      >
        {s}
      </button>
    ))}
  </div>
)

export default StatusChips
