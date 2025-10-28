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
import HasilKuisDragDrop from './pages/HasilKuisDragDrop';
import {supabase} from './supabaseClient'
import React, { useState, useEffect } from 'react';

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    })
  
    const{
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Routes>
        {/* ↓↓↓ TAMBAHKAN RUTE PUBLIK INI KEMBALI ↓↓↓
          Ini adalah rute yang akan menangkap navigasi ke /Login
        */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        {/* --- Rute yang Dilindungi --- */}
        <Route 
          path="/" 
          element={session ? <Home /> : <Navigate to="/Login" replace />} 
        />
        {/* Saya juga menambahkan /Home di sini untuk menangani kedua path */}
        <Route 
          path="/Home" 
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

        {/* Kuis Ejaan */}
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

        {/* Kuis Tata Kata */}
        {/* CATATAN: Rute /Kuis/Tata-Kata Anda menunjuk ke KuisBenarSalah, 
          ini mungkin salah ketik di App.jsx tapi saya ikuti dulu.
        */}
        <Route 
          path="/kuis/tata-kata/hasil" 
          element={session ? <HasilKuisBenarSalah /> : <Navigate to="/Login" replace />} 
        />
        <Route 
          path="/Kuis/Tata-Kata" 
          element={session ? <Navigate to="/Kuis/Tata-Kata/1" replace /> : <Navigate to="/Login" replace />} 
        />
        <Route 
          path="/Kuis/Tata-Kata/:questionNumber" 
          element={session ? <KuisBenarSalah /> : <Navigate to="/Login" replace />} 
        />

        {/* Kuis Tata Kalimat */}
        {/* CATATAN: Rute /Kuis/Tata-Kalimat Anda menunjuk ke DragDropKuis,
          ini juga mungkin salah ketik tapi saya ikuti.
        */}
        <Route 
          path="/Kuis/Tata-Kalimat" 
          element={session ? <Navigate to="/Kuis/Tata-Kalimat/drag-and-drop/1" replace /> : <Navigate to="/Login" replace />} 
        />
        <Route 
          path="/Kuis/Tata-Kalimat/drag-and-drop" 
          element={session ? <Navigate to="/Kuis/Tata-Kalimat/drag-and-drop/1" replace /> : <Navigate to="/Login" replace />} 
        />
        <Route 
          path="/Kuis/Tata-Kalimat/drag-and-drop/:questionNumber" 
          element={session ? <DragDropKuis /> : <Navigate to="/Login" replace />} 
        />
        <Route
          path="/kuis/tata-kalimat/drag-and-drop/hasil"
          element={session ? <HasilKuisDragDrop /> : <Navigate to="/Login" replace />}
        />
        
        {/* ↑↑↑ Blok kode yang dikomentari di file Anda sudah saya hapus 
          karena duplikat dan tidak memiliki perlindungan sesi.
        */}
      </Routes>
    </Router>
  )
}

export default App