import React, { useState } from 'react';
// 1. Import hook
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/BenarSalah.css'; 
import { Check, X } from 'lucide-react';

const KuisBenarSalah = () => {
  // 2. Siapkan hook
  const navigate = useNavigate();
  const { questionNumber } = useParams();
  const currentQuestionId = parseInt(questionNumber) || 1;

  // State untuk jawaban (tetap, menggunakan logika Benar/Salah Anda)
  const [selectedAnswer, setSelectedAnswer] = useState('');

  // Data opsi (tetap)
  const options = [
    { id: 'Benar', text: 'Benar' },
    { id: 'Salah', text: 'Salah' },
  ];

  // Data navigasi (tetap)
  const questionsData = [
    { id: 1, text: 'Pertanyaan 1', status: 'unanswered' },
    { id: 2, text: 'Pertanyaan 2', status: 'unanswered' },
    { id: 3, text: 'Pertanyaan 3', status: 'unanswered' },
    { id: 10, text: 'Pertanyaan 10', status: 'unanswered' },
  ];

  // Fungsi handle jawaban (tetap)
  const handleAnswerChange = (optionId) => {
    setSelectedAnswer(optionId);
  };

  // 3. Perbarui fungsi navigasi
  const getNavClass = (question) => {
    if (question.id === currentQuestionId) return 'current';
    return question.status;
  };

  const getNavIcon = (question) => {
    if (question.id === currentQuestionId) return null;
    // ... (logika switch case Anda tetap sama) ...
    switch (question.status) {
      case 'correct':
        return <Check size={18} className="icon-correct" />;
      case 'incorrect':
        return <X size={18} className="icon-incorrect" />;
      case 'unanswered':
        return <div className="icon-unanswered-circle"></div>;
      default:
        return null;
    }
  };

  // 4. Buat fungsi untuk tombol "Next"
  const handleNextClick = () => {
    const nextQuestion = currentQuestionId + 1;

    if (nextQuestion <= 10) {
      // Pindah ke soal Benar/Salah berikutnya
      navigate(`/kuis/ejaan/benar-salah/${nextQuestion}`);
    } else {
      // Selesai! Pindah ke section Drag and Drop (atau Halaman Hasil)
      navigate('/kuis/ejaan/drag-and-drop/1'); // Ganti ini ke halaman hasil jika sudah selesai
      // Contoh: navigate('/kuis/ejaan/hasil');
    }
  };

  return (
    <div className="kuis-page-container">
      <Header />
      <Sidebar />
      <main className="kuis-main-content">
        <div className="kuis-content-left">
          <h1 className="kuis-title">Kuis Ejaan (Benar atau Salah)</h1>
          <p className="kuis-question-text">
            {/* Nanti ganti ini dengan soal dinamis */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit?
          </p>

          <div className="kuis-options-list horizontal">
            {options.map((option) => (
              <label /* ... (kode label Anda tetap sama) ... */ >
                 {/* ... (kode input Anda tetap sama) ... */}
              </label>
            ))}
          </div>

          {/* 5. Tambahkan onClick ke tombol Next */}
          <button className="kuis-next-button" onClick={handleNextClick}>
            Next →
          </button>
        </div>

        <aside className="kuis-right-nav">
          <div className="kuis-nav-list">
            {questionsData.map((q) => (
              <div
                key={q.id}
                className={`kuis-nav-item ${getNavClass(q)}`}
                // 6. Buat navigasi kanan bisa diklik
                onClick={() => navigate(`/kuis/ejaan/benar-salah/${q.id}`)}
              >
                <span className="kuis-nav-icon-wrapper">
                  {getNavIcon(q)}
                </span>
                {q.text}
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default KuisBenarSalah;