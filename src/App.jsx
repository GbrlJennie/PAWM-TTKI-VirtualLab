import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import TataKata from './pages/TataKata'
import TataKalimat from './pages/TataKalimat'
import Ejaan from './pages/Ejaan'
import Login from './pages/Login'
import Register from './pages/Register'
import KuisMultipleChoice from './pages/KuisMultipleChoice'
import KuisBenarSalah from './pages/KuisBenarSalah'
import DragDropKuis from './pages/DragDropKuis'
import HasilKuisMultiple from './pages/HasilKuisMultiple';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Ejaan" element={<Ejaan />} />
        <Route path="/Tata-Kata" element={<TataKata />} />
        <Route path="/Tata-Kalimat" element={<TataKalimat />} />
        <Route path="/kuis/ejaan/multiple-choice/hasil" element={<HasilKuisMultiple />} />
        <Route path="/Kuis/Ejaan" element={<Navigate to="/kuis/ejaan/multiple-choice/1" replace />} />
        <Route path="/kuis/ejaan/multiple-choice/:questionNumber" element={<KuisMultipleChoice />} />
        <Route path="/Kuis/Tata-Kata" element={<KuisBenarSalah />} />
        <Route path="/Kuis/Tata-Kalimat/drag-and-drop" element={<Navigate to="/Kuis/Tata-Kalimat/drag-and-drop/1" replace />} />
        <Route path="/Kuis/Tata-Kalimat" element={<DragDropKuis />} />
      </Routes>
    </Router>
  )
}

export default App