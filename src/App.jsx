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
import HasilKuisBenarSalah from './pages/HasilKuisBenarSalah';
import {supabase} from './supabaseClient'
import React, { useState, useEffect } from 'react';

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })
  
  const{
    data: { subscription }
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session)
  })

  return () => subscription.unsubscribe()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route 
          path="/" 
          element={session ? <Home /> : <Navigate to="/Login" replace />} 
        />
        <Route 
          path="/Ejaan" 
          element={session ? <Ejaan /> : <Navigate to="/Login" replace />} 
        />
        <Route 
          path="/Tata-Kata" 
          element={session ? <TataKata /> : <Navigate to="/Login" replace />} 
        />
        <Route 
          path="/Tata-Kalimat" 
          element={session ? <TataKalimat /> : <Navigate to="/Login" replace />} 
        />

        <Route 
          path="/kuis/ejaan/multiple-choice/hasil" 
          element={session ? <HasilKuisMultiple /> : <Navigate to="/Login" replace />} 
        />
        <Route 
          path="/Kuis/Ejaan" 
          element={session ? <Navigate to="/kuis/ejaan/multiple-choice/1" replace /> : <Navigate to="/Login" replace />} 
        />
        <Route 
          path="/kuis/ejaan/multiple-choice/:questionNumber" 
          element={session ? <KuisMultipleChoice /> : <Navigate to="/Login" replace />} 
        />
        <Route 
          path="/Kuis/Tata-Kata" 
          element={session ? <KuisBenarSalah /> : <Navigate to="/Login" replace />} 
        />
        <Route 
          path="/Kuis/Tata-Kalimat/drag-and-drop" 
          element={session ? <Navigate to="/Kuis/Tata-Kalimat/drag-and-drop/1" replace /> : <Navigate to="/Login" replace />} 
        />
        <Route 
          path="/Kuis/Tata-Kalimat" 
          element={session ? <DragDropKuis /> : <Navigate to="/Login" replace />} 
        />

        <Route path="/Ejaan" element={<Ejaan />} />
        <Route path="/Tata-Kata" element={<TataKata />} />
        <Route path="/Tata-Kalimat" element={<TataKalimat />} />

        <Route path="/kuis/ejaan/multiple-choice/hasil" element={<HasilKuisMultiple />} />
        <Route path="/Kuis/Ejaan" element={<Navigate to="/kuis/ejaan/multiple-choice/1" replace />} />
        <Route path="/kuis/ejaan/multiple-choice/:questionNumber" element={<KuisMultipleChoice />} />

        <Route path="/kuis/tata-kata/hasil" element={<HasilKuisBenarSalah />} /> 
        <Route path="/Kuis/Tata-Kata" element={<Navigate to="/Kuis/Tata-Kata/1" replace />} /> 
        <Route path="/Kuis/Tata-Kata/:questionNumber" element={<KuisBenarSalah />} /> 

        <Route path="/Kuis/Tata-Kalimat/drag-and-drop" element={<Navigate to="/Kuis/Tata-Kalimat/drag-and-drop/1" replace />} />
        <Route path="/Kuis/Tata-Kalimat/drag-and-drop/:questionNumber" element={<DragDropKuis />} /> 
        <Route path="/Kuis/Tata-Kalimat" element={<Navigate to="/Kuis/Tata-Kalimat/drag-and-drop/1" replace />} />
      </Routes>
    </Router>
  )
}

export default App