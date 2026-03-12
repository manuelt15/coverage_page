import { useDatasources } from './hooks/useDatasources'
import Coverage from './pages/Coverage'
import './App.css'

const App = () => {
  const { data } = useDatasources()

  return (
    <div className="app">
      <header className="app-header">
        <span className="logo">rollee</span>
        <span className="coverage-label">
          Coverage <small>{data.length} platforms in total</small>
        </span>
      </header>
      <Coverage />
    </div>
  )
}

export default App
