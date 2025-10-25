import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TataKata from './pages/TataKata'
import Ejaan from './pages/Ejaan'
import Login from './pages/Login'
import KuisEjaan from './pages/KuisEjaan1'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Ejaan" element={<Ejaan />} />
        <Route path="/Tata-Kata" element={<TataKata />} />
        <Route path="/Tata-Kalimat" element={<TataKata />} />
        <Route path="/Kuis/Ejaan" element={<KuisEjaan />} />
      </Routes>
    </Router>
  )
}

export default App