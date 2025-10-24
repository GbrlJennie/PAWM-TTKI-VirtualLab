import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TataKata from './pages/TataKata'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Ejaan" element={<TataKata />} />
        <Route path="/Tata-Kata" element={<TataKata />} />
        <Route path="/Tata-Kalimat" element={<TataKata />} />
        <Route path="/Kuis/:id" element={<TataKata />} />
      </Routes>
    </Router>
  )
}

export default App