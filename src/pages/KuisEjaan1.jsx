import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/MultipleChoice.css';

import { Check, X } from 'lucide-react';

const KuisEjaan = () => {
  // State untuk melacak pertanyaan saat ini (Pertanyaan 5 di desain)
  const [currentQuestion, setCurrentQuestion] = useState(5);

  // State untuk melacak jawaban yang dipilih (A dan C di desain)
  const [selectedAnswers, setSelectedAnswers] = useState(['A', 'C']);

  // Data dummy untuk pilihan jawaban
  const options = [
    { id: 'A', text: 'Pilihan jawaban A' },
    { id: 'B', text: 'Pilihan jawaban B' },
    { id: 'C', text: 'Pilihan jawaban C' },
    { id: 'D', text: 'Pilihan jawaban D' },
    { id: 'E', text: 'Pilihan jawaban E' },
  ];

  // Data dummy untuk navigasi pertanyaan di sebelah kanan
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

  // Fungsi untuk menangani klik pada pilihan jawaban
  const handleAnswerChange = (optionId) => {
    setSelectedAnswers((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId) // Hapus jika sudah ada (uncheck)
        : [...prev, optionId] // Tambahkan jika belum ada (check)
    );
  };

  // Fungsi untuk mendapatkan kelas CSS berdasarkan status pertanyaan
  const getNavClass = (question) => {
    if (question.id === currentQuestion) {
      return 'current'; // -> Ini akan memberi outer stroke
    }
    return question.status; // -> 'correct', 'incorrect', atau 'unanswered'
  };

  // Fungsi untuk menampilkan ikon yang tepat
  const getNavIcon = (question) => {
    if (question.id === currentQuestion) {
      // Saat ini aktif, tidak ada ikon, hanya stroke dari CSS
      return null;
    }
    switch (question.status) {
      case 'correct':
        return <Check size={18} className="icon-correct" />;
      case 'incorrect':
        return <X size={18} className="icon-incorrect" />;
      case 'unanswered':
        return <div className="icon-unanswered-circle"></div>; // -> Ini lingkaran putih
      default:
        return null;
    }
  };

  return (
    <div className="kuis-page-container">
      <Header />
      <Sidebar />
      <main className="kuis-main-content">
        {/* Konten Kuis Utama (Sebelah Kiri) */}
        <div className="kuis-content-left">
          <h1 className="kuis-title">Kuis Ejaan</h1>
          <p className="kuis-question-text">
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

          <button className="kuis-next-button">Next →</button>
        </div>

        {/* Navigasi Pertanyaan (Sebelah Kanan) */}
        <aside className="kuis-right-nav">
          <div className="kuis-nav-list">
            {questionsData.map((q) => (
              <div
                key={q.id}
                className={`kuis-nav-item ${getNavClass(q)}`}
                onClick={() => setCurrentQuestion(q.id)}
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

export default KuisEjaan;