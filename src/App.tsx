import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChartsMaps from './pages/ChartsMaps';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="min-h-screen bg-[#114] text-white">
      <Router>
        <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="/contact" element = {<Contact/>} />
        <Route path="charts-maps" element={<ChartsMaps />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
