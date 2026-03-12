import './DataTable.css'

const COLUMNS = [['name', 'Platform'], ['type', 'Type'], ['status', 'Status']]

const SortIcon = ({ sortDir }) => (
  <span className="sort-icon">{sortDir === 'asc' ? '⬆️' : '⬇️'}</span>
)

const DataTable = ({ items, sortCol, sortDir, onSort }) => {
  if (items.length === 0) {
    return <p className="state-msg">No results found.</p>
  }

  return (
    <table className="data-table" aria-label="Platforms list">
      <thead>
        <tr>
          {COLUMNS.map(([col, label]) => (
            <th key={col} onClick={() => onSort(col)} aria-sort={sortCol === col ? sortDir : 'none'}>
              {label} <SortIcon col={col} sortCol={sortCol} sortDir={sortDir} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td className="platform-cell">
              {item.logoUrl && <img src={item.logoUrl} alt={item.name} className="logo-img" />}
              {item.name}
            </td>
            <td>{item.type}</td>
            <td>
              <span className={`status-badge status--${item.status === 'Working' ? 'working' : 'soon'}`}>
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable
