import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/DragDropKuis.css'; // Kita bisa pakai style yang sama
import { supabase } from '../supabaseClient';

const HasilKuisDragDrop = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Dapatkan pengguna yang sedang login
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) {
          navigate('/login'); // Jika tidak ada user, redirect ke login
          return;
        }

        // 2. Ambil semua hasil kuis dari tabel 'quiz_results'
        const { data, error: fetchError } = await supabase
          .from('quiz_results')
          .select('quiz_type, score, total') // Pilih kolom yang relevan
          .eq('user_id', user.id) // Filter berdasarkan user ID
          .like('quiz_type', 'Drag Drop:%'); // Filter hanya kuis Drag Drop

        if (fetchError) throw fetchError;

        setResults(data || []); // Set hasil atau array kosong jika tidak ada data

      } catch (err) {
        console.error('Error fetching Drag Drop results:', err);
        setError('Gagal memuat hasil kuis.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [navigate]); // Tambahkan navigate sebagai dependency

  // 3. Hitung skor total menggunakan useMemo
  const summary = useMemo(() => {
    if (results.length === 0) {
      return { totalScore: 0, totalPossible: 0, percentage: 0 };
    }

    const totalScore = results.reduce((sum, result) => sum + (result.score || 0), 0);
    const totalPossible = results.reduce((sum, result) => sum + (result.total || 0), 0);
    const percentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

    return { totalScore, totalPossible, percentage };
  }, [results]);

  if (loading) {
    return (
      <div className="kuis-result-container">
        <Header />
        <Sidebar />
        <main className="kuis-result-content">
          <p>Memuat hasil...</p>
        </main>
      </div>
    );
  }

  if (error) {
     return (
      <div className="kuis-result-container">
        <Header />
        <Sidebar />
        <main className="kuis-result-content">
          <p style={{ color: 'red' }}>{error}</p>
           <button onClick={() => navigate('/')}>Kembali ke Beranda</button>
        </main>
      </div>
    );
  }

  return (
    <div className="kuis-result-container">
      <Header />
      <Sidebar />
      <main className="kuis-result-content">
        <section className="kuis-result-header">
          <h1>Hasil Kuis Drag & Drop (Tata Kalimat)</h1>
          {results.length > 0 ? (
             <p>
              Skor total kamu **{summary.totalScore}** dari **{summary.totalPossible}** item yang benar
              ({summary.percentage}%).
            </p>
          ) : (
            <p>Anda belum menyelesaikan kuis Drag & Drop Tata Kalimat.</p>
          )}

        </section>

        {/* Opsional: Tampilkan detail per soal jika diinginkan */}
        {results.length > 0 && (
          <section className="kuis-result-list">
             {results.map((result, index) => (
              <article key={index} className="kuis-result-card">
                 {/* Hapus quiz_type prefix 'Drag Drop: ' */}
                <h2>{result.quiz_type.replace('Drag Drop: ', '')}</h2>
                <p>Skor: {result.score} / {result.total}</p>
              </article>
            ))}
          </section>
        )}


        <div className="kuis-result-actions">
          {/* Arahkan ke soal pertama kuis Drag Drop Tata Kalimat */}
          <button onClick={() => navigate('/Kuis/Tata-Kalimat/drag-and-drop/1')}>Ulangi Kuis</button>
          <button onClick={() => navigate('/Tata-Kalimat')}>Kembali ke Materi</button>
        </div>
      </main>
    </div>
  );
};

export default HasilKuisDragDrop;