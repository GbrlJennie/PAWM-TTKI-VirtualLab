import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/DragDropKuis.css';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const questionSets = {
  ejaan: [
    {
      title: 'Klasifikasi: Kalimat Efektif atau Tidak Efektif (1)',
      instructions:
        'Seret kalimat ke kolom "Efektif" jika kalimat tersusun singkat, jelas, dan tepat; ke kolom "Tidak Efektif" jika tampak bertele-tele, berulang, atau tidak efektif.',
      sentences: [
        { text: 'Ia hadir dalam rapat.', correct: 'Efektif' },
        { text: 'Karena hujan, jadi pertandingan ditunda.', correct: 'Tidak Efektif' },
        { text: 'Kami mendiskusikan tugas kelompok.', correct: 'Efektif' },
        { text: 'Dia pergi ke pasar untuk membeli sayur, lalu dia pulang kemudian memasak.', correct: 'Tidak Efektif' },
        { text: 'Adik membaca buku cerita di kamar.', correct: 'Efektif' },
        { text: 'Untuk alasan karena dia terlambat, maka ujian dimulai tanpa dia.', correct: 'Tidak Efektif' },
        { text: 'Para siswa membersihkan kelas.', correct: 'Efektif' },
        { text: 'Ia membaca buku dan kemudian menulis catatan, lalu dia meninjau catatan itu kembali.', correct: 'Tidak Efektif' },
      ],
    },
    {
      title: 'Klasifikasi: Efektif atau Tidak Efektif (2)',
      instructions: 'Susun klasifikasi yang benar berdasarkan efektivitas kalimat.',
      sentences: [
        { text: 'Mereka akan berpartisipasi dalam lomba.', correct: 'Efektif' },
        { text: 'Dia sangat, sangat senang atas kemenangannya.', correct: 'Tidak Efektif' },
        { text: 'Rina menulis laporan di ruang kerja.', correct: 'Efektif' },
        { text: 'Ia bekerja keras karena ingin mencapai tujuan sehingga dia berhasil.', correct: 'Tidak Efektif' },
        { text: 'Ayah memperbaiki kursi rusak itu.', correct: 'Efektif' },
        { text: 'Karena ia lapar maka ia makan makanan yang rasanya enak sekali.', correct: 'Tidak Efektif' },
        { text: 'Saya meminjam buku kepada Rudi.', correct: 'Efektif' },
        { text: 'Dia menyelesaikan tugasnya, kemudian dia tidur, setelah itu dia bangun.', correct: 'Tidak Efektif' },
      ],
    },
    {
      title: 'Klasifikasi: Efektif atau Tidak Efektif (3)',
      instructions: 'Tarik setiap kalimat ke kategori yang tepat.',
      sentences: [
        { text: 'Kalimat aktif lebih jelas daripada kalimat pasif dalam banyak konteks.', correct: 'Efektif' },
        { text: 'Saya ingin pergi ke toko karena saya perlu membeli sesuatu, jadi saya pergi.', correct: 'Tidak Efektif' },
        { text: 'Ia mencari rumah yang dijual.', correct: 'Efektif' },
        { text: 'Ia masuk ke dalam ruangan karena dia ingin melihat apa yang ada di dalamnya.', correct: 'Tidak Efektif' },
        { text: 'Mahasiswa itu belajar dan melakukan penelitian.', correct: 'Efektif' },
        { text: 'Dia makan makanan yang enak dan dia sangat menikmati makanannya itu.', correct: 'Tidak Efektif' },
        { text: 'Meja ini lebih berat daripada kursi itu.', correct: 'Efektif' },
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
        { text: 'Saya bertemu teman lama di pasar tadi pagi.', correct: 'Efektif' },
        { text: 'Karena ia ingin cepat selesai maka ia buru-buru jadi hasilnya kurang baik.', correct: 'Tidak Efektif' },
        { text: 'Subjek dan predikat harus seimbang dalam struktur kalimat.', correct: 'Efektif' },
        { text: 'Dia menunggu menunggu sampai temannya datang.', correct: 'Tidak Efektif' },
        { text: 'Ia menonton film baru semalam.', correct: 'Efektif' },
        { text: 'Saya pergi ke toko karena saya ingin membeli makanan jadi saya bergegas pergi.', correct: 'Tidak Efektif' },
        { text: 'Kepala sekolah memberikan sambutan.', correct: 'Efektif' },
        { text: 'Ketika sudah sampai, sampai dia lupa membawa barangnya.', correct: 'Tidak Efektif' },
      ],
    },
    {
      title: 'Tata Kalimat: Efektif atau Tidak Efektif (2)',
      instructions: 'Tarik setiap kalimat ke kategori yang tepat.',
      sentences: [
        { text: 'Sinta membaca buku di ruang tamu.', correct: 'Efektif' },
        { text: 'Dia berjalan pergi keluar dari pintu yang terbuka lebar sekali.', correct: 'Tidak Efektif' },
        { text: 'Kami mengunjungi nenek di desa.', correct: 'Efektif' },
        { text: 'Ia menunggu di depan sambil menunggu lagi di belakang.', correct: 'Tidak Efektif' },
        { text: 'Para siswa mengikuti upacara.', correct: 'Efektif' },
        { text: 'Karena tidak punya uang maka dia tidak bisa membeli apa-apa sehingga kecewa.', correct: 'Tidak Efektif' },
        { text: 'Dia terlambat karena bangun kesiangan.', correct: 'Efektif' },
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

  const saveDragDropResult = async (score, total, questionTitle) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('quiz_results')
          .insert([
            {
              user_id: user.id,
              // Kita buat quiz_type unik untuk tiap soal drag/drop
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
    // 3. PANGGIL FUNGSI SIMPAN SEBELUM NAVIGASI
    if (checked) {
      // Hitung skor dari state feedback
      const currentQuestion = questions[currentQuestionIndex];
      const correctTotal = Object.values(feedback).filter(f => f === 'correct').length;
      const total = currentQuestion.sentences.length;
      
      // Kirim ke Supabase
      saveDragDropResult(correctTotal, total, currentQuestion.title);
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