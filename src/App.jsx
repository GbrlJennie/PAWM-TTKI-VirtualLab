import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TataKata from './pages/TataKata'
import Ejaan from './pages/Ejaan'
import TataKalimat from './pages/TataKalimat'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Ejaan" element={<Ejaan />} />
        <Route path="/Tata-Kata" element={<TataKata />} />
        <Route path="/Tata-Kalimat" element={<TataKalimat />} />
        <Route path="/Kuis/:id" element={<TataKalimat />} />
      </Routes>
    </Router>
  )
}

export default App