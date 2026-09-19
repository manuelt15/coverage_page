import { useState, useMemo } from 'react'
import { useDatasources } from '../hooks/useDatasources'
import { sortItems } from '../utils/sort'
import Tabs from '../components/Tabs/Tabs'
import SearchBar from '../components/SearchBar/SearchBar'
import StatusChips from '../components/StatusChips/StatusChips'
import DataTable from '../components/DataTable/DataTable'

const CATEGORIES = ['All Platforms', 'Gig Economy', 'Payments', 'Payroll & HRIS', 'Tax Portals', 'Utilities']
const STATUSES = ['Working', 'Coming soon']

const Coverage = () => {
  const { data, loading, error } = useDatasources()

  const [activeTab, setActiveTab] = useState('All Platforms')
  const [search, setSearch] = useState('')
  const [activeStatuses, setActiveStatuses] = useState(STATUSES)
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  const handleSort = (col) => {
    if (sortCol === col) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortCol(col)
      setSortDir('asc')
    }
  }

  const toggleStatus = (status) => {
    setActiveStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    )
  }

  const tabCounts = useMemo(() => {
    const counts = { 'All Platforms': data.length }
    CATEGORIES.slice(1).forEach(cat => {
      counts[cat] = data.filter(d => d.category === cat).length
    })
    return counts
  }, [data])

  const filtered = useMemo(() => {
    let result = data

    if (activeTab !== 'All Platforms') {
      result = result.filter(d => d.category === activeTab)
    }
    if (search.trim()) {
      result = result.filter(d => d.name.toLowerCase().includes(search.trim().toLowerCase()))
    }
    result = result.filter(d => activeStatuses.includes(d.status))

    return sortItems(result, sortCol, sortDir)
  }, [data, activeTab, search, activeStatuses, sortCol, sortDir])

  return (
    <main className="app-main">
      <div className="toolbar">
        <Tabs tabs={CATEGORIES} active={activeTab} counts={tabCounts} onSelect={setActiveTab} />

        <div className="toolbar-row">
          <SearchBar value={search} onChange={setSearch} />
          <StatusChips active={activeStatuses} onToggle={toggleStatus} />
          <p className="result-count">
            {filtered.length} of {data.length}
          </p>
        </div>
      </div>

      {loading && <p className="state-msg">Loading platforms...</p>}
      {error && <p className="state-msg error">Could not load platforms: {error}</p>}
      {!loading && !error && (
        <DataTable items={filtered} sortCol={sortCol} sortDir={sortDir} onSort={handleSort} />
      )}
    </main>
  )
}

export default Coverage
