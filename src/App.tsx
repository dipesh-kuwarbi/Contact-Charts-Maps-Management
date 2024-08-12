import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/home"
import ChartsMaps from './pages/ChartsMaps';


function App() {
  return (
    <div className="min-h-screen bg-[#114] text-white">
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="charts-maps" element={<ChartsMaps />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
