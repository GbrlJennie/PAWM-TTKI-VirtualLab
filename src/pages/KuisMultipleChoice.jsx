import React, { useState } from 'react';
// 1. Import hook yang diperlukan
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/MultipleChoice.css';
import { Check, X } from 'lucide-react';

const KuisMultipleChoice = () => {
  // 2. Siapkan hook navigasi
  const navigate = useNavigate();
  
  // 3. Ambil nomor soal dari URL, bukan state
  const { questionNumber } = useParams();
  const currentQuestionId = parseInt(questionNumber) || 1; // Ubah "1", "2" dari URL jadi angka

  // State untuk jawaban tetap diperlukan
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  // Data dummy untuk navigasi kanan (ini tetap)
  const questionsData = [
    { id: 1, text: 'Pertanyaan 1', status: 'correct' },
    { id: 2, text: 'Pertanyaan 2', status: 'correct' },
    { id: 3, text: 'Pertanyaan 3', status: 'incorrect' },
    { id: 4, text: 'Pertanyaan 4', status: 'correct' },
    { id: 5, text: 'Pertanyaan 5', status: 'unanswered' },
    { id: 6, text: 'Pertanyaan 6', status: 'unanswered' },
    { id: 7, text: 'Pertanyaan 7', status: 'unanswered' },
    { id: 8, text: 'Pertanyaan 8', status: 'unanswered' },
    { id: 9, text: 'Pertanyaan 9', status: 'unanswered' },
    { id: 10, text: 'Pertanyaan 10', status: 'unanswered' },
  ];

  // Data dummy untuk pilihan jawaban (ini tetap)
  const options = [
    { id: 'A', text: 'Pilihan jawaban A' },
    { id: 'B', text: 'Pilihan jawaban B' },
    { id: 'C', text: 'Pilihan jawaban C' },
    { id: 'D', text: 'Pilihan jawaban D' },
    { id: 'E', text: 'Pilihan jawaban E' },
  ];

  // Fungsi handle jawaban (ini tetap)
  const handleAnswerChange = (optionId) => {
    setSelectedAnswers((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  // 4. Perbarui fungsi navigasi agar menggunakan currentQuestionId dari URL
  const getNavClass = (question) => {
    if (question.id === currentQuestionId) {
      return 'current';
    }
    return question.status;
  };

  const getNavIcon = (question) => {
    if (question.id === currentQuestionId) {
      return null;
    }
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

  // 5. Buat fungsi untuk tombol "Next"
  const handleNextClick = () => {
    const nextQuestion = currentQuestionId + 1;

    if (nextQuestion <= 10) {
      // Jika masih ada soal di section ini, pindah ke soal berikutnya
      navigate(`/kuis/ejaan/multiple-choice/${nextQuestion}`);
    } else {
      // Jika ini soal ke-10, pindah ke section berikutnya (soal no 1)
      navigate('/kuis/ejaan/benar-salah/1');
    }
    // (Anda mungkin ingin menyimpan jawaban user di sini sebelum pindah)
  };

  return (
    <div className="kuis-page-container">
      <Header />
      <Sidebar />
      <main className="kuis-main-content">
        <div className="kuis-content-left">
          <h1 className="kuis-title">Kuis Ejaan (Multiple Choice)</h1>
          <p className="kuis-question-text">
            {/* Nanti Anda akan ganti ini dengan data soal dinamis */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?
          </p>

          <div className="kuis-options-list">
            {options.map((option) => (
              <label  
                key={option.id}
                className={`kuis-option-label ${
                  selectedAnswers.includes(option.id) ? 'selected' : ''
                }`}
              >
                <input
                  type="checkbox"
                  className="kuis-real-checkbox"
                  checked={selectedAnswers.includes(option.id)}
                  onChange={() => handleAnswerChange(option.id)}
                />
                <span className="kuis-custom-checkbox"></span>
                {option.text}
              </label>
            ))}
          </div>

          {/* 6. Tambahkan onClick ke tombol Next */}
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
                // 7. Buat navigasi kanan bisa diklik
                onClick={() => navigate(`/kuis/ejaan/multiple-choice/${q.id}`)}
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

export default KuisMultipleChoice;