import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import TataKata from './pages/TataKata'
import Ejaan from './pages/Ejaan'
import Login from './pages/Login'
import KuisMultipleChoice from './pages/KuisMultipleChoice' 
import KuisBenarSalah from './pages/KuisBenarSalah'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Ejaan" element={<Ejaan />} />
        <Route path="/Tata-Kata" element={<TataKata />} />
        <Route path="/Tata-Kalimat" element={<TataKata />} />
        <Route path="/Kuis/Ejaan" element={<Navigate to="/kuis/ejaan/multiple-choice/1" replace />} />
        <Route path="/kuis/ejaan/multiple-choice/:questionNumber" element={<KuisMultipleChoice />} />
        <Route path="/kuis/ejaan/benar-salah/:questionNumber" element={<KuisBenarSalah />} />

        {/* Nanti Anda bisa tambahkan ini untuk drag and drop */}
        {/* <Route path="/kuis/ejaan/drag-and-drop/:questionNumber" element={<KuisDragAndDrop />} /> */}

        {/* --- Anda bisa ulangi pola yang sama untuk Kuis Tata Kata --- */}
        <Route path="/Kuis/Tata-Kata" element={<Navigate to="/kuis/tata-kata/multiple-choice/1" replace />} />
        {/* <Route path="/kuis/tata-kata/multiple-choice/:questionNumber" element={...} /> */}
        {/* <Route path="/kuis/tata-kata/benar-salah/:questionNumber" element={...} /> */}

      </Routes>
    </Router>
  )
}

export default App