import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TataKata from './pages/TataKata'
import Login from './pages/Login';
import KuisEjaan from './pages/KuisEjaan1';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/Ejaan" element={<TataKata />} />
        <Route path="/Tata-Kata" element={<TataKata />} />
        <Route path="/Tata-Kalimat" element={<TataKata />} />
        <Route path="/Kuis/Ejaan" element={<KuisEjaan />} />
      </Routes>
    </Router>
  )
}

export default App