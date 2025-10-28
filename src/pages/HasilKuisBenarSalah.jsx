import React, { useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/MultipleChoiceResult.css'; // Kita bisa pakai style yang sama
import { supabase } from '../supabaseClient';

const HasilKuisBenarSalah = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  // Ambil data dari state navigasi
  const answers = state?.answers ?? {};
  const questions = state?.questions ?? [];

  const summary = useMemo(() => {
    const detail = questions.map((question) => {
      const selected = answers[question.id] ?? null;
      const isCorrect = selected === question.isCorrect;
      return { question, selected, isCorrect };
    });
    const correctTotal = detail.filter((item) => item.isCorrect).length;
    return { detail, correctTotal, total: detail.length };
  }, [answers, questions]);

  // Simpan hasil ke Supabase
  useEffect(() => {
    const saveResult = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user && summary.total > 0) { // Pastikan ada data
          const { data, error } = await supabase
            .from('quiz_results')
            .insert([
              { 
                user_id: user.id, 
                quiz_type: 'Benar Salah Tata Kata', // <-- NAMA KUIS BERBEDA
                score: summary.correctTotal,
                total: summary.total
              }
            ]);

          if (error) throw error;
          console.log('Quiz result saved:', data);
        }
      } catch (error) {
        console.error('Error saving quiz result:', error.message);
      }
    };

    if (state?.answers) {
      saveResult();
    }
  }, [summary, state]);

  // Jika user refresh halaman/datang tanpa state, tendang ke awal kuis
  if (!state?.answers) {
    navigate('/Kuis/Tata-Kata/1', { replace: true });
    return null;
  }

  return (
    <div className="kuis-result-container">
      <Header />
      <Sidebar />
      <main className="kuis-result-content">
        <section className="kuis-result-header">
          <h1>Hasil Kuis Benar Salah</h1>
          <p>
            Skor kamu {summary.correctTotal} dari {summary.total} pertanyaan
            ({Math.round((summary.correctTotal / summary.total) * 100)}%).
          </p>
        </section>

        <section className="kuis-result-list">
          {summary.detail.map(({ question, selected, isCorrect }) => (
            <article key={question.id} className={`kuis-result-card ${isCorrect ? 'correct' : 'incorrect'}`}>
              <h2>{`Pertanyaan ${question.id}`}</h2>
              <p className="kuis-result-question">{question.text}</p>
              <div className="kuis-result-answers">
                <p>
                  Jawaban kamu:{' '}
                  {selected === null ? 'Belum dijawab' : (selected ? 'Benar' : 'Salah')}
                </p>
                <p>
                  Jawaban benar:{' '}
                  {question.isCorrect ? 'Benar' : 'Salah'}
                </p>
              </div>
            </article>
          ))}
        </section>

        <div className="kuis-result-actions">
          <button onClick={() => navigate('/Kuis/Tata-Kata/1')}>Ulangi Kuis</button>
          <button onClick={() => navigate('/Tata-Kata')}>Kembali ke Materi</button>
        </div>
      </main>
    </div>
  );
};

export default HasilKuisBenarSalah;