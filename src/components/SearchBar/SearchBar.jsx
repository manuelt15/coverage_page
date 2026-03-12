import './SearchBar.css'

const SearchBar = ({ value, onChange }) => (
  <input
    className="search-bar"
    type="search"
    placeholder="Search..."
    value={value}
    onChange={e => onChange(e.target.value)}
    aria-label="Search platforms"
  />
)

export default SearchBar
