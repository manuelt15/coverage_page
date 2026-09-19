import BrandLogo from '../BrandLogo/BrandLogo'
import './DataTable.css'

const COLUMNS = [
  ['name', 'Platform'],
  ['type', 'Type'],
  ['category', 'Category'],
  ['status', 'Status'],
]

const ARIA_SORT = { asc: 'ascending', desc: 'descending' }

const SortIcon = ({ dir }) => (
  <svg className={`sort-icon sort-icon--${dir}`} viewBox="0 0 12 12" aria-hidden="true">
    <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const DataTable = ({ items, sortCol, sortDir, onSort }) => {
  if (items.length === 0) {
    return <p className="state-msg">No platforms match these filters.</p>
  }

  return (
    <div className="table-card">
      <table className="data-table">
        <thead>
          <tr>
            {COLUMNS.map(([col, label]) => (
              <th key={col} scope="col" aria-sort={sortCol === col ? ARIA_SORT[sortDir] : 'none'}>
                <button type="button" className="th-button" onClick={() => onSort(col)}>
                  {label}
                  {/* El icono solo aparece en la columna que ordena de verdad. */}
                  {sortCol === col && <SortIcon dir={sortDir} />}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td data-label="Platform">
                <span className="platform-cell">
                  <BrandLogo name={item.name} domain={item.domain} />
                  {item.name}
                </span>
              </td>
              <td data-label="Type">{item.type}</td>
              <td data-label="Category">{item.category}</td>
              <td data-label="Status">
                <span className={`status-chip status-chip--${item.status === 'Working' ? 'working' : 'soon'}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
