import './SearchBar.css'

const SearchBar = ({ value, onChange }) => (
  <div className="search-bar">
    <svg className="search-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M7 1.5a5.5 5.5 0 1 0 3.4 9.82l3.14 3.14a.75.75 0 1 0 1.06-1.06l-3.14-3.14A5.5 5.5 0 0 0 7 1.5Zm-4 5.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
        fill="currentColor"
      />
    </svg>
    <input
      type="search"
      placeholder="Search platforms"
      value={value}
      onChange={e => onChange(e.target.value)}
      aria-label="Search platforms"
    />
  </div>
)

export default SearchBar
