import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/MateriDetail.css';
import ejaanImg from '../assets/Ejaan-Banner.png';

const Ejaan = () => {
  const [activeSection, setActiveSection] = useState('pengantar');

  const sections = [
    { id: 'pengantar', title: 'Pengantar Ejaan' },
    { id: 'huruf', title: 'Penggunaan Huruf' },
    { id: 'kata', title: 'Penulisan Kata' },
    { id: 'pemenggalan', title: 'Pemenggalan Kata' },
    { id: 'tandabaca', title: 'Penggunaan Tanda Baca' },
  ];

  const content = {
    pengantar: {
      title: 'Pengantar Ejaan',
      type: 'text',
      definition: 'Ejaan adalah aturan penulisan huruf, kata, dan penggunaan tanda baca dalam bahasa Indonesia.',
      tujuan: [
        'Menggunakan huruf secara tepat (kapital, miring, tebal).',
        'Menulis kata sesuai kaidah PUEBI.',
        'Memahami dan menerapkan tanda baca dengan benar.',
      ],
    },
    huruf: {
      title: 'Penggunaan Huruf',
      type: 'items',
      items: [
        {
          label: 'a. Huruf Kapital',
          description: 'Dipakai untuk:',
          points: [
            'Awal kalimat',
            'Nama orang, tempat, bangsa, suku, bahasa',
            'Gelar kehormatan dan jabatan',
          ],
          example: '✔ Presiden Jokowi\n❌ presiden Jokowi',
        },
        {
          label: 'b. Huruf Miring & Tebal',
          description: 'Huruf miring: judul buku, istilah asing, penegasan dalam teks.',
          example: 'Huruf tebal: poin penting, penegasan visual dalam teks cetak.',
        },
      ],
    },
    kata: {
      title: 'Penulisan Kata',
      type: 'items',
      items: [
        {
          label: 'Kata Dasar',
          description: 'Kata dasar ditulis terpisah.',
          example: 'Contoh: makan, minum',
        },
        {
          label: 'Kata Berimbuhan',
          description: 'Kata berimbuhan menyatu dengan imbuhannya.',
          example: 'Contoh: menulis, berjalan',
        },
        {
          label: 'Kata Ulang',
          description: 'Kata ulang memakai tanda hubung jika diperlukan.',
          example: 'Contoh: anak-anak',
        },
        {
          label: 'Gabungan Kata',
          description: 'Gabungan kata umumnya ditulis terpisah.',
          example: 'Contoh: rumah sakit, tanggung jawab',
        },
      ],
    },
    pemenggalan: {
      title: 'Pemenggalan Kata',
      type: 'text',
      description: 'Dilakukan saat pergantian baris:',
      points: [
        'Berdasarkan suku kata',
        'Tidak memisah dua huruf vokal pada satu suku kata',
      ],
      example: 'Contoh: ke-la-jar-an, ma-in',
    },
    tandabaca: {
      title: 'Penggunaan Tanda Baca',
      type: 'items',
      items: [
        {
          label: 'a. Tanda Titik (.)',
          description: 'Akhir kalimat berita',
          example: 'Contoh: Dia membaca buku.',
        },
        {
          label: 'b. Tanda Koma (,)',
          description: 'Memisahkan unsur sejenis',
          example: 'Contoh: Saya membeli apel, jeruk, dan mangga.',
        },
        {
          label: 'c. Tanda Tanya (?)',
          description: 'Kalimat tanya',
          example: 'Contoh: Apa yang kamu lakukan?',
        },
        {
          label: 'd. Tanda Seru (!)',
          description: 'Perintah atau emosi kuat',
          example: 'Contoh: Awas!',
        },
      ],
    },
  };

  const currentContent = content[activeSection];

  return (
    <div className="materi-wrapper">
      <Header />
      <Sidebar />
      <main className="materi-content">
        {/* Banner */}
        <div className="materi-banner" style={{ backgroundImage: `url(${ejaanImg})` }}>
          <h1 className="banner-title"></h1>
        </div>

        <div className="materi-container">
          {/* Sidebar Navigation */}
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

          {/* Main Content */}
          <div className="materi-main">
            <h2 className="content-title">{currentContent.title}</h2>

            {currentContent.type === 'text' && (
              <>
                {currentContent.definition && (
                  <p className="content-description">
                    <strong>Definisi:</strong> {currentContent.definition}
                  </p>
                )}
                
                {currentContent.description && (
                  <p className="content-description">{currentContent.description}</p>
                )}

                {currentContent.tujuan && (
                  <>
                    <h3 className="content-subtitle">Tujuan Pembelajaran:</h3>
                    <ul className="content-list">
                      {currentContent.tujuan.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}

                {currentContent.points && (
                  <ul className="content-list">
                    {currentContent.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}

                {currentContent.example && (
                  <p className="content-example">{currentContent.example}</p>
                )}
              </>
            )}

            {currentContent.type === 'items' && (
              <div className="content-items">
                {currentContent.items.map((item, index) => (
                  <div key={index} className="item">
                    <h3 className="item-label">{item.label}</h3>
                    <p className="item-description">{item.description}</p>
                    {item.points && (
                      <ul className="item-list">
                        {item.points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    )}
                    {item.example && (
                      <p className="item-example">{item.example}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ejaan;