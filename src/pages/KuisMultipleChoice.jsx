import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/MultipleChoice.css';
import { Check, X } from 'lucide-react';
import { multipleChoiceQuestions } from '../data/multipleChoiceQuestions';

const statusFromAnswer = (question, answerIds) => {
  if (!Array.isArray(answerIds) || answerIds.length === 0) return 'unanswered';
  const correctIds = question.options.filter((opt) => opt.isCorrect).map((opt) => opt.id).sort();
  const selected = [...answerIds].sort();
  if (correctIds.length !== selected.length) return 'incorrect';
  return correctIds.every((id, idx) => id === selected[idx]) ? 'correct' : 'incorrect';
};

const KuisMultipleChoice = () => {
  const navigate = useNavigate();
  const { questionNumber } = useParams();

  const totalQuestions = multipleChoiceQuestions.length;
  const currentQuestionIndex = useMemo(() => {
    const idx = parseInt(questionNumber ?? '1', 10) - 1;
    return idx >= 0 && idx < totalQuestions ? idx : 0;
  }, [questionNumber, totalQuestions]);

  const currentQuestion = multipleChoiceQuestions[currentQuestionIndex];
  const [answers, setAnswers] = useState({});
  const selectedAnswers = answers[currentQuestion?.id] ?? [];
  const correctCount = currentQuestion?.options.filter((opt) => opt.isCorrect).length ?? 0;
  const allowMultiple = correctCount > 1;

  const handleAnswerChange = (optionId) => {
    setAnswers((prev) => {
      const current = prev[currentQuestion.id] ?? [];
      const exists = current.includes(optionId);
      const updated = exists ? current.filter((id) => id !== optionId) : [...current, optionId];
      return { ...prev, [currentQuestion.id]: updated };
    });
  };

  const handleNextClick = () => {
    const nextQuestion = currentQuestionIndex + 2;
    if (nextQuestion <= totalQuestions) {
      navigate(`/kuis/ejaan/multiple-choice/${nextQuestion}`);
    } else {
      navigate('/kuis/ejaan/multiple-choice/hasil', { state: { answers } });
    }
  };

  return (
    <div className="kuis-page-container">
      <Header />
      <Sidebar />
      <main className="kuis-main-content">
        <div className="kuis-content-left">
          <h1 className="kuis-title">Kuis Ejaan (Multiple Choice)</h1>
          <p className="kuis-question-text">{currentQuestion?.text}</p>
          <p className="kuis-instruction">
            {allowMultiple ? 'Pilih semua jawaban yang benar.' : 'Pilih jawaban yang benar.'}
          </p>

          <div className="kuis-options-list">
            {currentQuestion?.options.map((option) => (
              <label
                key={option.id}
                className={`kuis-option-label ${selectedAnswers.includes(option.id) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  name={`multiple-choice-${currentQuestion.id}`}
                  className="kuis-real-checkbox"
                  checked={selectedAnswers.includes(option.id)}
                  onChange={() => handleAnswerChange(option.id)}
                />
                <span className="kuis-custom-checkbox" />
                {option.text}
              </label>
            ))}
          </div>

          <button className="kuis-next-button" onClick={handleNextClick}>
            Next →
          </button>
        </div>

        <aside className="kuis-right-nav">
          <div className="kuis-nav-list">
            {multipleChoiceQuestions.map((question) => {
              const status = statusFromAnswer(question, answers[question.id]);
              const isCurrent = question.id === currentQuestion?.id;
              return (
                <div
                  key={question.id}
                  className={`kuis-nav-item ${isCurrent ? 'current' : status}`}
                  onClick={() => navigate(`/kuis/ejaan/multiple-choice/${question.id}`)}
                >
                  <span className="kuis-nav-icon-wrapper">
                    {!isCurrent &&
                      (status === 'correct' ? (
                        <Check size={18} className="icon-correct" />
                      ) : status === 'incorrect' ? (
                        <X size={18} className="icon-incorrect" />
                      ) : (
                        <div className="icon-unanswered-circle" />
                      ))}
                  </span>
                  {`Pertanyaan ${question.id}`}
                </div>
              );
            })}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default KuisMultipleChoice;