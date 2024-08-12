import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ChartsMaps from './pages/ChartsAndMaps'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-[#F9ECEE] text-white">
      <Router>
        <Routes>
          <Route path="/" element={<Contact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/charts-maps" element={<ChartsMaps />} />
          <Route path="*" element={<NotFound />} />{' '}
          {/* Catch-all route for 404 */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
