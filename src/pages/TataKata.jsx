import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/MateriDetail.css';
import tataKataImg from '../assets/Tata-Kata-Banner.png';

const MateriDetail = () => {
  const [activeSection, setActiveSection] = useState('pengantar');

  const sections = [
    { id: 'pengantar', title: 'Pengertian Tata Kata' },
    { id: 'jenis', title: 'Jenis Kata Penting' },
    { id: 'pola', title: 'Pola Kalimat Dasar' },
    { id: 'diksi', title: 'Diksi yang Efektif' },
    { id: 'perbaikan', title: 'Contoh Perbaikan Kalimat' },
  ];

  const content = {
    pengantar: {
      title: 'Pengertian Tata Kata',
      description:
        'Tata kata adalah aturan dalam memilih, mengurutkan, dan menggunakan kata agar kalimat menjadi jelas, logis, dan efektif.',
      focusPoints: [
        'Pemilihan kata yang tepat (diksi)',
        'Bentuk kata sesuai kaidah (imbuhan, kata ulang, majemuk)',
        'Susunan kata yang benar dalam kalimat',
      ],
    },
    jenis: {
      title: 'Jenis Kata Penting',
      tableHeaders: ['Jenis Kata', 'Fungsi', 'Contoh'],
      rows: [
        { jenis: 'Kata benda (nomina)', fungsi: 'Menyebut nama orang, tempat, benda', contoh: 'buku, Andi, sekolah' },
        { jenis: 'Kata kerja (verba)', fungsi: 'Menyatakan tindakan atau keadaan', contoh: 'makan, belajar' },
        { jenis: 'Kata sifat (adjektiva)', fungsi: 'Menjelaskan sifat benda', contoh: 'besar, indah' },
        { jenis: 'Kata keterangan (adverbia)', fungsi: 'Menjelaskan waktu/cara/tempat', contoh: 'sekarang, cepat, di sini' },
        { jenis: 'Kata sambung (konjungsi)', fungsi: 'Menghubungkan frasa/kalimat', contoh: 'karena, dan, tetapi' },
      ],
    },
    pola: {
      title: 'Pola Kalimat Dasar',
      intro: 'Kalimat paling sederhana memiliki pola:',
      patterns: [
        { pola: 'S + P', penjelasan: 'S (Subjek) sebagai pelaku, P (Predikat) sebagai tindakan atau keadaan.', contoh: 'Aku tidur.' },
        { pola: 'S + P + O', penjelasan: 'O (Objek) sebagai sasaran tindakan.', contoh: 'Aku menonton film.' },
        { pola: 'S + P + Pelengkap', penjelasan: 'Pelengkap menegaskan predikat.', contoh: 'Dia menjadi dokter.' },
        { pola: 'S + P + Keterangan', penjelasan: 'Keterangan memberi informasi tambahan.', contoh: 'Ibu memasak di dapur.' },
      ],
    },
    diksi: {
      title: 'Diksi yang Efektif',
      points: [
        'Gunakan kata yang sesuai konteks.',
        'Hindari ungkapan berbelit-belit.',
        'Pastikan tidak menimbulkan makna ganda.',
      ],
      contohSalah: 'Beliau sudah wafat meninggal dunia.',
      contohBenar: 'Beliau sudah wafat.',
    },
    perbaikan: {
      title: 'Contoh Perbaikan Kalimat',
      tableHeaders: ['Kalimat Salah', 'Perbaikan'],
      rows: [
        { salah: 'Saya sangat suka sekali es krim.', benar: 'Saya sangat suka es krim.' },
        { salah: 'Kamu dimana?', benar: 'Kamu di mana?' },
        { salah: 'Para hadirin-hadirin!', benar: 'Hadirin sekalian!' },
      ],
    },
  };

  const currentContent = content[activeSection];

  return (
    <div className="materi-wrapper">
      <Header />
      <Sidebar />
      <main className="materi-content">
        <div className="materi-banner" style={{ backgroundImage: `url(${tataKataImg})` }} />

        <div className="materi-container">
          <aside className="materi-sidebar">
            <nav className="section-nav">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`section-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.title}
                </div>
              ))}
            </nav>
          </aside>

          <div className="materi-main">
            <h2 className="content-title">{currentContent.title}</h2>

            {activeSection === 'pengantar' && (
              <>
                <p className="content-description">{currentContent.description}</p>
                <ul className="content-list">
                  {currentContent.focusPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </>
            )}

            {activeSection === 'jenis' && (
              <div className="table-wrapper">
                <table className="materi-table">
                  <thead>
                    <tr>
                      {currentContent.tableHeaders.map((header) => (
                        <th key={header}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentContent.rows.map((row, index) => (
                      <tr key={index}>
                        <td>{row.jenis}</td>
                        <td>{row.fungsi}</td>
                        <td>{row.contoh}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeSection === 'pola' && (
              <>
                <p className="content-description">{currentContent.intro}</p>
                <div className="content-items">
                  {currentContent.patterns.map((item, index) => (
                    <div key={index} className="item">
                      <h3 className="item-label">{item.pola}</h3>
                      <p className="item-description">{item.penjelasan}</p>
                      <p className="item-example">Contoh: {item.contoh}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeSection === 'diksi' && (
              <div className="content-items">
                <ul className="content-list">
                  {currentContent.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <div className="item">
                  <p className="item-example">
                    ❌ {currentContent.contohSalah}
                    <br />
                    ✅ {currentContent.contohBenar}
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'perbaikan' && (
              <div className="table-wrapper">
                <table className="materi-table">
                  <thead>
                    <tr>
                      {currentContent.tableHeaders.map((header) => (
                        <th key={header}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentContent.rows.map((row, index) => (
                      <tr key={index}>
                        <td>{row.salah}</td>
                        <td>{row.benar}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MateriDetail;