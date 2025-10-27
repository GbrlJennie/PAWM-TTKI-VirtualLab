import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/DragDropKuis.css';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const questionSets = {
  ejaan: [
    {
      title: 'Klasifikasi: Kalimat Efektif atau Tidak Efektif (1)',
      instructions:
        'Seret kalimat ke kolom "Efektif" jika kalimat tersusun singkat, jelas, dan tepat; ke kolom "Tidak Efektif" jika tampak bertele-tele, berulang, atau tidak efektif.',
      sentences: [
        { text: 'Huruf kapital digunakan pada awal kalimat.', correct: 'Efektif' },
        { text: 'Karena hujan, jadi pertandingan ditunda.', correct: 'Tidak Efektif' },
        { text: 'Kalimat harus memiliki subjek dan predikat.', correct: 'Efektif' },
        { text: 'Dia pergi ke pasar untuk membeli sayur, lalu dia pulang kemudian memasak.', correct: 'Tidak Efektif' },
        { text: 'Gunakan tanda koma untuk memisahkan unsur sejenis.', correct: 'Efektif' },
        { text: 'Untuk alasan karena dia terlambat, maka ujian dimulai tanpa dia.', correct: 'Tidak Efektif' },
        { text: 'Pemenggalan kata mengikuti suku kata.', correct: 'Efektif' },
        { text: 'Ia membaca buku dan kemudian menulis catatan, lalu dia meninjau catatan itu kembali.', correct: 'Tidak Efektif' },
      ],
    },
    {
      title: 'Klasifikasi: Efektif atau Tidak Efektif (2)',
      instructions: 'Susun klasifikasi yang benar berdasarkan efektivitas kalimat.',
      sentences: [
        { text: 'Huruf tebal menonjolkan poin penting.', correct: 'Efektif' },
        { text: 'Dia sangat, sangat senang atas kemenangannya.', correct: 'Tidak Efektif' },
        { text: 'Gunakan tanda titik untuk akhir kalimat berita.', correct: 'Efektif' },
        { text: 'Ia bekerja keras karena ingin mencapai tujuan sehingga dia berhasil.', correct: 'Tidak Efektif' },
        { text: 'Kata ulang ditulis dengan tanda hubung bila perlu.', correct: 'Efektif' },
        { text: 'Karena ia lapar maka ia makan makanan yang rasanya enak sekali.', correct: 'Tidak Efektif' },
        { text: 'Teks ringkas dan jelas memudahkan pembaca memahami maksudnya.', correct: 'Efektif' },
        { text: 'Dia menyelesaikan tugasnya, kemudian dia tidur, setelah itu dia bangun.', correct: 'Tidak Efektif' },
      ],
    },
    {
      title: 'Klasifikasi: Efektif atau Tidak Efektif (3)',
      instructions: 'Tarik setiap kalimat ke kategori yang tepat.',
      sentences: [
        { text: 'Kalimat aktif lebih jelas daripada kalimat pasif dalam banyak konteks.', correct: 'Efektif' },
        { text: 'Saya ingin pergi ke toko karena saya perlu membeli sesuatu, jadi saya pergi.', correct: 'Tidak Efektif' },
        { text: 'Hindari pengulangan kata yang tidak perlu.', correct: 'Efektif' },
        { text: 'Ia masuk ke dalam ruangan karena dia ingin melihat apa yang ada di dalamnya.', correct: 'Tidak Efektif' },
        { text: 'Susun kalimat yang ringkas dan jelas.', correct: 'Efektif' },
        { text: 'Dia makan makanan yang enak dan dia sangat menikmati makanannya itu.', correct: 'Tidak Efektif' },
        { text: 'Gunakan tanda baca untuk memperjelas makna kalimat.', correct: 'Efektif' },
        { text: 'Ketika dia tiba, tiba-tiba listrik mati sehingga lampu padam.', correct: 'Tidak Efektif' },
      ],
    },
  ],
  'tata-kalimat': [
    {
      title: 'Tata Kalimat: Efektif atau Tidak Efektif (1)',
      instructions:
        'Kelompokkan kalimat sesuai efektivitasnya untuk materi Tata Kalimat.',
      sentences: [
        { text: 'Kalimat aktif memperjelas pelaku dalam tindakan.', correct: 'Efektif' },
        { text: 'Karena ia ingin cepat selesai maka ia buru-buru jadi hasilnya kurang baik.', correct: 'Tidak Efektif' },
        { text: 'Subjek dan predikat harus seimbang dalam struktur kalimat.', correct: 'Efektif' },
        { text: 'Dia menunggu menunggu sampai temannya datang.', correct: 'Tidak Efektif' },
        { text: 'Gunakan konjungsi seperlunya agar kalimat tetap ringkas.', correct: 'Efektif' },
        { text: 'Saya pergi ke toko karena saya ingin membeli makanan jadi saya bergegas pergi.', correct: 'Tidak Efektif' },
        { text: 'Predikat tidak boleh diulang tanpa alasan.', correct: 'Efektif' },
        { text: 'Ketika sudah sampai, sampai dia lupa membawa barangnya.', correct: 'Tidak Efektif' },
      ],
    },
    {
      title: 'Tata Kalimat: Efektif atau Tidak Efektif (2)',
      instructions: 'Tarik setiap kalimat ke kategori yang tepat.',
      sentences: [
        { text: 'Kalimat yang padat membantu pembaca memahami inti pesan.', correct: 'Efektif' },
        { text: 'Dia berjalan pergi keluar dari pintu yang terbuka lebar sekali.', correct: 'Tidak Efektif' },
        { text: 'Gunakan kata ganti yang konsisten dalam satu kalimat.', correct: 'Efektif' },
        { text: 'Ia menunggu di depan sambil menunggu lagi di belakang.', correct: 'Tidak Efektif' },
        { text: 'Predikat yang tepat membuat kalimat tidak rancu.', correct: 'Efektif' },
        { text: 'Karena tidak punya uang maka dia tidak bisa membeli apa-apa sehingga kecewa.', correct: 'Tidak Efektif' },
        { text: 'Konstruksi kalimat perlu menonjolkan informasi utama.', correct: 'Efektif' },
        { text: 'Kalimatnya panjang karena memakai banyak kata yang sebetulnya tidak perlu.', correct: 'Tidak Efektif' },
      ],
    },
  ],
};

const DragDropKuis = ({ quizType = 'Tata-Kalimat' }) => {
  const questions = useMemo(() => questionSets[quizType] ?? questionSets['ejaan'], [quizType]);
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
    setPoolItems(q ? q.sentences.map((s) => s.text) : []);
    setAssigned({});
    setDraggingItem(null);
    setChecked(false);
    setFeedback({});
  }, [currentQuestionIndex, questions]);

  const basePath =
    quizType === 'tata-kalimat' ? '/kuis/tata-kalimat/drag-and-drop' : '/kuis/tata-kalimat/drag-and-drop';

  const handleNextClick = () => {
    // currentQuestionIndex is zero-based; question numbers in the route are 1-based
    const nextQuestionNumber = currentQuestionIndex + 2; // +1 to move to next, +1 for 1-based numbering

    if (nextQuestionNumber <= totalQuestions) {
      // Jika masih ada soal di section ini, pindah ke soal berikutnya
      navigate(`${basePath}/${nextQuestionNumber}`);
    } else {
      // Jika sudah melewati jumlah soal di section ini, kembali ke soal pertama di section yang sama
      navigate(`${basePath}/1`);
    }
    // (Anda mungkin ingin menyimpan jawaban user di sini sebelum pindah)
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
    const newFeedback = {};
    Object.entries(assigned).forEach(([text, zone]) => {
      const correctZone = q.sentences.find((s) => s.text === text)?.correct;
      newFeedback[text] = correctZone === zone ? 'correct' : 'wrong';
    });
    setFeedback(newFeedback);
    setChecked(true);
  };

  const currentQuestion =
    questions[currentQuestionIndex] || { title: '', instructions: '', sentences: [] };
  const assignedEfektif = Object.keys(assigned).filter((text) => assigned[text] === 'Efektif');
  const assignedTidak = Object.keys(assigned).filter((text) => assigned[text] === 'Tidak Efektif');

  return (
    <div className="dragdrop-wrapper">
      <Header />
      <Sidebar />
      <main className="dragdrop-content">
        <section className="dragdrop-header">
          <h1>{currentQuestion.title}</h1>
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
                    onClick={() => handleRemove(item)}
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
                    onClick={() => handleRemove(item)}
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
            disabled={Object.keys(assigned).length === 0}
          >
            Cek Jawaban
          </button>
          <button className="kuis-next-button" onClick={handleNextClick} disabled={!checked}>
            Next →
          </button>
        </div>
      </main>
    </div>
  );
};


export default DragDropKuis;