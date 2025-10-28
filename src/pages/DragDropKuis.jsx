import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/DragDropKuis.css';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
// Import data soal dari file terpisah
import { questionSets } from '../data/dragDropQuestions';

// Menghapus prop quizType dan default 'ejaan' karena komponen ini HANYA untuk Tata Kalimat
const DragDropKuis = () => {
  // Tetapkan quizType secara internal ke 'tata-kalimat'
  const quizType = 'tata-kalimat';

  // Logika useMemo sekarang secara eksplisit mengambil 'tata-kalimat'
  const questions = useMemo(() => questionSets[quizType] ?? [], [quizType]);

  const { questionNumber } = useParams();
  const currentQuestionIndex = Math.max(0, Number(questionNumber || 1) - 1);
  const totalQuestions = questions.length;

  const navigate = useNavigate();

  const [poolItems, setPoolItems] = useState([]);
  const [draggingItem, setDraggingItem] = useState(null);
  const [assigned, setAssigned] = useState({});
  const [checked, setChecked] = useState(false);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    const q = questions[currentQuestionIndex];
    if (q) {
      setPoolItems(q.sentences.map((s) => s.text));
    } else {
      setPoolItems([]);
    }
    setAssigned({});
    setDraggingItem(null);
    setChecked(false);
    setFeedback({});
  }, [currentQuestionIndex, questions]);

  // basePath sekarang secara eksplisit HANYA untuk Tata Kalimat
  const basePath = '/Kuis/Tata-Kalimat/drag-and-drop';

  const saveDragDropResult = async (score, total, questionTitle) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('quiz_results')
          .insert([
            {
              user_id: user.id,
              // Judul kuis masih dinamis dari data soal
              quiz_type: `Drag Drop: ${questionTitle}`,
              score: score,
              total: total
            }
          ]);
        if (error) throw error;
        console.log('DragDrop result saved:', data);
      }
    } catch (error) {
      console.error('Error saving DragDrop result:', error.message);
    }
  };

  const handleNextClick = () => {
    if (checked) {
      const currentQuestion = questions[currentQuestionIndex];
      if (!currentQuestion) {
        console.error("Kesalahan: Data pertanyaan saat ini tidak ditemukan.");
        navigate('/Tata-Kalimat');
        return;
      }
      const correctTotal = Object.values(feedback).filter(f => f === 'correct').length;
      const total = currentQuestion.sentences.length;
      // Simpan hasil soal terakhir SEBELUM navigasi
      saveDragDropResult(correctTotal, total, currentQuestion.title).then(() => {
          const nextQuestionNum = currentQuestionIndex + 2;

          if (nextQuestionNum <= totalQuestions) {
            navigate(`${basePath}/${nextQuestionNum}`);
          } else {
            // ↓↓↓ PERUBAHAN DI SINI ↓↓↓
            // Arahkan ke halaman hasil baru setelah soal terakhir
            navigate('/kuis/tata-kalimat/drag-and-drop/hasil');
            // ↑↑↑ SELESAI PERUBAHAN ↑↑↑
          }
      }); // Pastikan navigasi terjadi setelah save selesai (opsional tapi lebih aman)
    }
  };

  const handleDragStart = (item) => setDraggingItem(item);
  const handleDragEnd = () => setDraggingItem(null);

  const handleDropZone = (event, zone) => {
    event.preventDefault();
    if (!draggingItem) return;
    setAssigned((prev) => ({ ...prev, [draggingItem]: zone }));
    setPoolItems((prev) => prev.filter((text) => text !== draggingItem));
    setDraggingItem(null);
  };

  const handleRemove = (item) => {
    if (checked) return;
    setAssigned((prev) => {
      const copy = { ...prev };
      delete copy[item];
      return copy;
    });
    setPoolItems((prev) => [...prev, item]);
    setChecked(false);
    setFeedback((prev) => {
      const copy = { ...prev };
      delete copy[item];
      return copy;
    });
  };

  const handleCheck = () => {
    const q = questions[currentQuestionIndex];
    if (!q) return;

    const newFeedback = {};
    Object.entries(assigned).forEach(([text, zone]) => {
      const correctZone = q.sentences.find((s) => s.text === text)?.correct;
      newFeedback[text] = correctZone === zone ? 'correct' : 'wrong';
    });
    setFeedback(newFeedback);
    setChecked(true);
  };

  const currentQuestion =
    questions[currentQuestionIndex] || { title: 'Memuat...', instructions: '', sentences: [] };
  const assignedEfektif = Object.keys(assigned).filter((text) => assigned[text] === 'Efektif');
  const assignedTidak = Object.keys(assigned).filter((text) => assigned[text] === 'Tidak Efektif');

  const allItemsAssigned = poolItems.length === 0 && Object.keys(assigned).length > 0;

  return (
    <div className="dragdrop-wrapper">
      <Header />
      <Sidebar />
      <main className="dragdrop-content">
        <section className="dragdrop-header">
          {/* Tambahkan judul utama Kuis */}
          <h1>Kuis Tata Kalimat (Drag & Drop)</h1>
          {/* Judul soal tetap dari data */}
          <h2>{currentQuestion.title}</h2>
          <p>{currentQuestion.instructions}</p>
        </section>

        <section className="dragdrop-pool">
          {poolItems.map((item) => (
            <div
              key={item}
              className="dragdrop-chip"
              draggable
              onDragStart={() => handleDragStart(item)}
              onDragEnd={handleDragEnd}
            >
              {item}
            </div>
          ))}
          {poolItems.length === 0 && (
            <span className="dragdrop-empty">Semua item telah dipindahkan.</span>
          )}
        </section>

        <section className="dragdrop-zones">
          <div
            className="dragdrop-zone-column"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDropZone(event, 'Efektif')}
          >
            <span className="dragdrop-zone-label">Efektif</span>
            {assignedEfektif.length === 0 ? (
              <p className="dragdrop-placeholder">Tarik di sini</p>
            ) : (
              <ol className="dragdrop-answer-list">
                {assignedEfektif.map((item) => (
                  <li
                    key={item}
                    className={`dragdrop-answer-item ${
                      checked ? (feedback[item] === 'correct' ? 'correct' : 'incorrect') : ''
                    }`}
                    onClick={() => !checked && handleRemove(item)}
                    style={{ cursor: checked ? 'default' : 'pointer' }}
                  >
                    {item}
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div
            className="dragdrop-zone-column"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDropZone(event, 'Tidak Efektif')}
          >
            <span className="dragdrop-zone-label">Tidak Efektif</span>
            {assignedTidak.length === 0 ? (
              <p className="dragdrop-placeholder">Tarik di sini</p>
            ) : (
              <ol className="dragdrop-answer-list">
                {assignedTidak.map((item) => (
                  <li
                    key={item}
                    className={`dragdrop-answer-item ${
                      checked ? (feedback[item] === 'correct' ? 'correct' : 'incorrect') : ''
                    }`}
                    onClick={() => !checked && handleRemove(item)}
                    style={{ cursor: checked ? 'default' : 'pointer' }}
                  >
                    {item}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>

        <div className="dragdrop-actions">
          <button
            className="kuis-check-button"
            onClick={handleCheck}
            disabled={!allItemsAssigned || checked}
          >
            Cek Jawaban
          </button>
          <button className="kuis-next-button" onClick={handleNextClick} disabled={!checked}>
            {currentQuestionIndex === totalQuestions - 1 ? 'Selesai →' : 'Next →'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default DragDropKuis;