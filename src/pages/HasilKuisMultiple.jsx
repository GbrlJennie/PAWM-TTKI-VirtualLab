import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/MultipleChoiceResult.css';
import { multipleChoiceQuestions } from '../data/multipleChoiceQuestions';

const HasilKuisMultiple = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const answers = state?.answers ?? {};
  const summary = useMemo(() => {
    const detail = multipleChoiceQuestions.map((question) => {
      const selected = answers[question.id] ?? [];
      const correctIds = question.options.filter((opt) => opt.isCorrect).map((opt) => opt.id);
      const isCorrect =
        selected.length === correctIds.length &&
        correctIds.every((id) => selected.includes(id));
      return { question, selected, correctIds, isCorrect };
    });
    const correctTotal = detail.filter((item) => item.isCorrect).length;
    return { detail, correctTotal, total: detail.length };
  }, [answers]);

  if (!state?.answers) {
    navigate('/kuis/ejaan/multiple-choice/1', { replace: true });
    return null;
  }

  return (
    <div className="kuis-result-container">
      <Header />
      <Sidebar />
      <main className="kuis-result-content">
        <section className="kuis-result-header">
          <h1>Hasil Kuis Multiple Choice</h1>
          <p>
            Skor kamu {summary.correctTotal} dari {summary.total} pertanyaan
            ({Math.round((summary.correctTotal / summary.total) * 100)}%).
          </p>
        </section>

        <section className="kuis-result-list">
          {summary.detail.map(({ question, selected, correctIds, isCorrect }) => (
            <article key={question.id} className={`kuis-result-card ${isCorrect ? 'correct' : 'incorrect'}`}>
              <h2>{`Pertanyaan ${question.id}`}</h2>
              <p className="kuis-result-question">{question.text}</p>
              <div className="kuis-result-answers">
                <p>
                  Jawaban kamu:{' '}
                  {selected.length
                    ? selected.map((id) => `${id}. ${question.options.find((opt) => opt.id === id)?.text}`).join(', ')
                    : 'Belum dijawab'}
                </p>
                <p>
                  Jawaban benar:{' '}
                  {correctIds
                    .map((id) => `${id}. ${question.options.find((opt) => opt.id === id)?.text}`)
                    .join(', ')}
                </p>
              </div>
            </article>
          ))}
        </section>

        <div className="kuis-result-actions">
          <button onClick={() => navigate('/kuis/ejaan/multiple-choice/1')}>Ulangi Kuis</button>
          <button onClick={() => navigate('/Kuis/Ejaan')}>Kembali ke Menu Kuis</button>
        </div>
      </main>
    </div>
  );
};

export default HasilKuisMultiple;