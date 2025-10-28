import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/BenarSalah.css'; 
import { Check, X } from 'lucide-react';
import { benarSalahQuestions } from '../data/benarSalahQuestions';

// Fungsi ini sekarang akan membandingkan boolean === boolean
const statusFromAnswer = (question, answer) => {
  if (answer === null || answer === undefined) return 'unanswered'; // Menangani null atau undefined
  return answer === question.isCorrect ? 'correct' : 'incorrect';
};

const KuisBenarSalah = () => {
  const navigate = useNavigate();
  const { questionNumber } = useParams();

  const totalQuestions = benarSalahQuestions.length;
  const currentQuestionIndex = useMemo(() => {
    const idx = parseInt(questionNumber ?? '1', 10) - 1;
    return idx >= 0 && idx < totalQuestions ? idx : 0;
  }, [questionNumber, totalQuestions]);

  const currentQuestion = benarSalahQuestions[currentQuestionIndex];
  
  const [answers, setAnswers] = useState({}); 

  const selectedAnswer = answers[currentQuestion?.id] ?? null;
  
  // ↓↓↓ PERUBAHAN UTAMA DI SINI ↓↓↓
  // Ubah 'id' dari string ('true') menjadi boolean (true)
  const options = [
    { id: true, text: 'Benar' },
    { id: false, text: 'Salah' },
  ];
  // ↑↑↑ SELESAI PERUBAHAN ↑↑↑

  // Fungsi ini sekarang akan menerima dan menyimpan boolean (true/false)
  const handleAnswerChange = (optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  // Perbaikan Logika:
  // getNavClass sekarang MENGHITUNG status
  const getNavClass = (question) => {
    if (question.id === currentQuestion.id) return 'current';
    
    const answer = answers[question.id];
    // Kirim jawaban dan pertanyaan ke statusFromAnswer
    return statusFromAnswer(question, answer); 
  };

  // getNavIcon sekarang MENERIMA status dari getNavClass
  const getNavIcon = (question, status) => {
    if (question.id === currentQuestion.id) return null;
    switch (status) {
      case 'correct':
        return <Check size={18} className="icon-correct" />;
      case 'incorrect':
        return <X size={18} className="icon-incorrect" />;
      default: // 'unanswered'
        return <div className="icon-unanswered-circle"></div>;
    }
  };

  const handleNextClick = () => {
    const nextQuestion = currentQuestionIndex + 2; 

    if (nextQuestion <= totalQuestions) {
      navigate(`/Kuis/Tata-Kata/${nextQuestion}`);
    } else {
      navigate('/kuis/tata-kata/hasil', { 
        state: { 
          answers: answers,
          questions: benarSalahQuestions 
        } 
      });
    }
  };

  return (
    <div className="kuis-page-container">
      <Header />
      <Sidebar />
      <main className="kuis-main-content">
        <div className="kuis-content-left">
          <h1 className="kuis-title">Kuis Tata Kata (Benar atau Salah)</h1>
          <p className="kuis-question-text">
            {currentQuestion?.text}
          </p>

          <div className="kuis-options-list horizontal">
            {options.map((option) => (
              <label
                // Gunakan String(option.id) untuk key agar aman
                key={String(option.id)} 
                className={`kuis-option-label ${
                  // Perbandingan ini (boolean === boolean) sekarang berfungsi
                  selectedAnswer === option.id ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name={`kuis-benar-salah-${currentQuestion.id}`}
                  className="kuis-real-checkbox"
                  checked={selectedAnswer === option.id}
                  onChange={() => handleAnswerChange(option.id)}
                />
                <span className="kuis-custom-checkbox"></span> 
                {option.text}
              </label>
            ))}
          </div>

          <button className="kuis-next-button" onClick={handleNextClick}>
            {currentQuestionIndex === totalQuestions - 1 ? 'Selesai →' : 'Next →'}
          </button>
        </div>

        <aside className="kuis-right-nav">
          <div className="kuis-nav-list">
            {/* Perbaikan Logika Navigasi */}
            {benarSalahQuestions.map((q) => {
              // Hitung status satu kali
              const navClass = getNavClass(q); 
              return (
                <div
                  key={q.id}
                  // Gunakan status yang dihitung
                  className={`kuis-nav-item ${navClass}`} 
                  onClick={() => navigate(`/Kuis/Tata-Kata/${q.id}`)}
                >
                  <span className="kuis-nav-icon-wrapper">
                    {/* Kirim status yang dihitung ke getNavIcon */}
                    {getNavIcon(q, navClass)} 
                  </span>
                  {`Pertanyaan ${q.id}`}
                </div>
              );
            })}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default KuisBenarSalah;