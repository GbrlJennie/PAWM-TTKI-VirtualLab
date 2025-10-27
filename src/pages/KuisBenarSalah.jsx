import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/BenarSalah.css'; 
import { Check, X } from 'lucide-react';
import { benarSalahQuestions } from '../data/benarSalahQuestions';

const statusFromAnswer = (question, answer) => {
  if (answer === null) return 'unanswered';
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
  
  // 3. State untuk SEMUA jawaban (bukan cuma 1)
  const [answers, setAnswers] = useState({}); // format: { 1: true, 2: false, ... }

  // Ambil jawaban untuk soal ini, 'null' jika belum dijawab
  const selectedAnswer = answers[currentQuestion?.id] ?? null;
  const options = [
    { id: 'true', text: 'Benar' },
    { id: 'false', text: 'Salah' },
  ];
  // Fungsi handle jawaban (tetap)
  const handleAnswerChange = (optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  // 3. Perbarui fungsi navigasi
  const getNavClass = (question) => {
    if (question.id === currentQuestion.id) return 'current';
    return statusFromAnswer(question, answers[question.id]?? null);
  };

  const getNavIcon = (question) => {
    if (question.id === currentQuestion.id) return null;
    switch (question.status) {
      case 'correct':
        return <Check size={18} className="icon-correct" />;
      case 'incorrect':
        return <X size={18} className="icon-incorrect" />;
      default:
        return <div className="icon-unanswered-circle"></div>;
    }
  };

  // 4. Buat fungsi untuk tombol "Next"
  const handleNextClick = () => {
    const nextQuestion = currentQuestionIndex + 2; // (index 0-based + 2 = nomor soal 1-based berikutnya)

    if (nextQuestion <= totalQuestions) {
      navigate(`/Kuis/Tata-Kata/${nextQuestion}`);
    } else {
      // Selesai! Kirim data ke Halaman Hasil
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
                key={option.id}
                className={`kuis-option-label ${
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
            {benarSalahQuestions.map((q) => (
              <div
                key={q.id}
                className={`kuis-nav-item ${getNavClass(q)}`}
                onClick={() => navigate(`/Kuis/Tata-Kata/${q.id}`)}
              >
                <span className="kuis-nav-icon-wrapper">
                  {getNavIcon(q)}
                </span>
                {`Pertanyaan ${q.id}`}
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default KuisBenarSalah;